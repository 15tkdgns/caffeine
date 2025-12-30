
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { apiClient } from '../api/client';
import { getAnomalies, reportAnomaly, ignoreAnomaly } from '../api/anomalies';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useTransactions } from '../contexts/TransactionContext';
import EmptyState from '../components/EmptyState';
import AddTransactionModal from '../components/AddTransactionModal';

// 카테고리 매핑 (구 카테고리명 → 신 카테고리명)
const mapCategory = (category) => {
    const mapping = {
        '식비': '외식',
        '여가': '생활',
        '공과금': '생활',
        '의료': '생활',
        '카페': '외식',
    };
    return mapping[category] || category;
};

import { formatCurrency } from '../utils/currency';
import { EMPTY_MESSAGES } from '../constants';

export default function TransactionScreen({ navigation, route }) {
    const { colors } = useTheme();
    const { transactions, updateTransactionNote, addTransaction, removeTransaction } = useTransactions();
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [anomalyCategoryModalVisible, setAnomalyCategoryModalVisible] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [editedNote, setEditedNote] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [couponNotification, setCouponNotification] = useState(null); // 쿠폰 발급 알림
    const [isPredicting, setIsPredicting] = useState(false); // 예측 로딩 상태

    // Anomaly Mode State
    const [anomalyMode, setAnomalyMode] = useState(false);
    const [anomalyLoading, setAnomalyLoading] = useState(false);
    const [anomalyTransactions, setAnomalyTransactions] = useState([]);

    // 거래 목록이 변경되면 예측 결과 리셋 (새 거래 기반으로 다시 예측 필요)
    useEffect(() => {
        setPrediction(null);
        setCouponNotification(null);
    }, [transactions.length]);

    useEffect(() => {
        if (route.params?.filter === 'anomaly' || route.params?.filter === 'suspicious') {
            fetchAnomalies();
        } else {
            setAnomalyMode(false);
            setAnomalyTransactions([]);
        }
    }, [route.params?.filter]);

    // 화면을 벗어날 때 필터 파라미터를 초기화하여 거래내역 탭 진입 시 일반 거래가 보이도록 함
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            navigation.setParams({ filter: undefined });
            setAnomalyMode(false);
            setAnomalyTransactions([]);
        });
        return unsubscribe;
    }, [navigation]);

    const fetchAnomalies = async () => {
        setAnomalyMode(true);
        setAnomalyLoading(true);
        try {
            const data = await getAnomalies();
            // Filter only pending/high risk if needed, currently showing all returned
            // Map to transaction format if needed, but AnomalyResponse is consistent enough
            // We might need to map 'riskLevel' to 'status' or similar for display
            setAnomalyTransactions(data.map(a => ({
                ...a,
                isAnomaly: true,
                notes: `${a.riskLevel} - ${a.reason}`
            })));
        } catch (error) {
            console.error(error);
            setAnomalyMode(false);
        } finally {
            setAnomalyLoading(false);
        }
    };

    // 화면 포커스 시 필터가 없으면 일반 거래 보기로 복귀
    useFocusEffect(
        useCallback(() => {
            if (!route.params?.filter) {
                setAnomalyMode(false);
                setAnomalyTransactions([]);
            }
        }, [route.params?.filter])
    );

    // 거래 수 변동 시 이상거래 모드라면 최신 탐지 결과를 다시 가져옴
    useEffect(() => {
        if (anomalyMode) {
            fetchAnomalies();
        }
    }, [transactions.length, anomalyMode]);

    // 카테고리별 쿠폰 정보 매핑
    const CATEGORY_COUPONS = {
        '식료품': { merchant: '이마트', discount: 3000, description: '마트 할인 쿠폰' },
        '주유': { merchant: 'SK에너지', discount: 3000, description: '주유 할인 쿠폰' },
        '교통': { merchant: '카카오택시', discount: 2000, description: '택시비 할인 쿠폰' },
        '식비': { merchant: '배달의민족', discount: 3000, description: '배달 할인 쿠폰' },
        '외식': { merchant: '스타벅스', discount: 2000, description: '카페 할인 쿠폰' },
        '쇼핑': { merchant: '쿠팡', discount: 5000, description: '쇼핑 할인 쿠폰' },
        '편의점': { merchant: 'GS25', discount: 1000, description: '편의점 할인 쿠폰' },
        '여가': { merchant: 'CGV', discount: 3000, description: '영화 할인 쿠폰' },
        '문화': { merchant: '인터파크', discount: 5000, description: '공연 할인 쿠폰' },
        '의료': { merchant: '약국', discount: 2000, description: '약국 할인 쿠폰' },
        '기타': { merchant: '올리브영', discount: 2000, description: '뷰티 할인 쿠폰' },
    };

    const fetchPrediction = useCallback(async () => {
        console.log('=== fetchPrediction 호출됨 ===');
        console.log('transactions 개수:', transactions?.length);
        try {
            if (!transactions || transactions.length < 5) {
                Alert.alert('데이터 부족', '예측을 위해 최소 5건 이상의 거래 데이터가 필요합니다.');
                return;
            }

            setIsPredicting(true); // 로딩 시작

            // 거래 데이터를 CSV 형식으로 변환
            const csvHeader = '날짜,시간,타입,대분류,소분류,내용,금액,화폐,결제수단,메모\n';
            const csvRows = transactions.map(t => {
                const datetime = (t.date || '').split(' ');
                const date = datetime[0] || new Date().toISOString().split('T')[0];
                // 시간 형식 보정: HH:MM -> HH:MM:SS (백엔드 요구사항)
                let time = datetime[1] || '12:00:00';
                if (time && time.split(':').length === 2) {
                    time = time + ':00';  // 초가 없으면 추가
                }
                return [
                    date,
                    time,
                    '지출',
                    t.category || t.originalCategory || '외식',
                    '기타',
                    t.merchant || t.businessName || '알수없음',
                    -Math.abs(t.amount),
                    'KRW',
                    t.cardType === '체크' ? '체크카드' : '신용카드',
                    t.notes || ''
                ].join(',');
            }).join('\n');

            const csvContent = csvHeader + csvRows;

            // FormData로 CSV 전송
            const formData = new FormData();
            const blob = new Blob([csvContent], { type: 'text/csv' });
            formData.append('file', blob, 'transactions.csv');


            // predict-next API 호출 (전체 이력 기반)
            const response = await apiClient.post('/ml/predict-next', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const predictedCategory = response.data.predicted_category;
            const confidence = response.data.confidence;
            setPrediction(predictedCategory);


            // 예측된 카테고리에 맞는 쿠폰 발급 알림
            const couponInfo = CATEGORY_COUPONS[predictedCategory] || CATEGORY_COUPONS['기타'];

            // 새 쿠폰 객체 생성
            const newCoupon = {
                id: Date.now(),
                merchant: couponInfo.merchant,
                discount: couponInfo.discount,
                category: predictedCategory,
                expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: 'available',
                description: `AI 예측 기반 자동 발급 (신뢰도 ${(confidence * 100).toFixed(0)}%)`,
                minPurchase: couponInfo.discount * 3,
                daysLeft: 30
            };

            // 쿠폰 발급 배너 표시 (confirm 대신)
            setCouponNotification({
                category: predictedCategory,
                confidence: confidence,
                coupon: newCoupon,
                couponInfo: couponInfo,
                txCount: transactions.length
            });

        } catch (error) {
            console.error('Prediction failed:', error);
            Alert.alert('예측 실패', '예측 중 오류가 발생했습니다.\n\n' + (error.response?.data?.detail || error.message));
        } finally {
            setIsPredicting(false); // 로딩 종료
        }
    }, [transactions]); // transactions가 변경될 때마다 함수 업데이트

    const filteredTransactions = (anomalyMode ? anomalyTransactions : transactions).filter(t => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            t.merchant?.toLowerCase().includes(query) ||
            t.category?.toLowerCase().includes(query) ||
            t.notes?.toLowerCase().includes(query) ||
            (t.businessName && t.businessName.toLowerCase().includes(query))
        );
    });

    const handleReportAnomaly = async () => {
        if (!selectedTransaction) return;
        try {
            await reportAnomaly(selectedTransaction.id);
            // Update status instead of removing
            setAnomalyTransactions(prev => prev.map(t =>
                t.id === selectedTransaction.id ? { ...t, status: 'reported' } : t
            ));
            // Update selected transaction as well to reflect in modal immediately
            setSelectedTransaction(prev => ({ ...prev, status: 'reported' }));

            Alert.alert('신고 완료', '이상거래로 신고되었습니다.\n관리자가 검토할 것입니다.');
        } catch (error) {
            Alert.alert('오류', '신고 처리에 실패했습니다.');
        }
    };

    const handleIgnoreAnomaly = async () => {
        if (!selectedTransaction) return;
        try {
            await ignoreAnomaly(selectedTransaction.id);
            setAnomalyTransactions(prev => prev.filter(t => t.id !== selectedTransaction.id));
            setModalVisible(false);
        } catch (error) {
            Alert.alert('오류', '처리 실패');
        }
    };

    const handleTransactionClick = (item) => {
        setSelectedTransaction(item);
        setEditedNote(item.notes || '');
        setIsEditingNote(false);
        setModalVisible(true);
    };

    const handleMarkAsAnomaly = () => {
        setModalVisible(false);
        setTimeout(() => {
            setAnomalyCategoryModalVisible(true);
        }, 300);
    };

    // 이상거래 카테고리 선택
    const handleCategorySelect = (category) => {
        if (!selectedTransaction) return;

        setAnomalyCategoryModalVisible(false);

        const messages = {
            safe: '안전한 거래로 표시되었습니다.',
            suspicious: '의심 거래로 표시되었습니다.\n이상탐지 탭에서 확인할 수 있습니다.',
            dangerous: '위험 거래로 표시되었습니다.\n고객센터로 자동 신고되었습니다.'
        };

        setTimeout(() => {
            alert(messages[category]);
            if (category === 'suspicious' || category === 'dangerous') {
                navigation?.navigate('이상탐지');
            }
        }, 300);
    };

    // 메모 저장
    const handleSaveNote = async () => {
        if (selectedTransaction) {
            const result = await updateTransactionNote(selectedTransaction.id, editedNote);

            if (result.success) {
                setSelectedTransaction({ ...selectedTransaction, notes: editedNote });
                setIsEditingNote(false);
            } else {
                alert('메모 저장 실패: ' + (result.error?.message || '알 수 없는 오류'));
            }
        }
    };

    // 거래 삭제
    const handleDeleteTransaction = async () => {
        console.log('handleDeleteTransaction 호출됨');

        if (!selectedTransaction) {
            console.log('selectedTransaction이 없음');
            return;
        }

        const txId = selectedTransaction.id;
        console.log('삭제할 거래 ID:', txId);

        // 모달 닫기
        setModalVisible(false);
        setSelectedTransaction(null);

        try {
            const result = await removeTransaction(txId);
            console.log('삭제 결과:', result);
            if (result.success) {
                console.log('거래 삭제 완료:', txId);
                // 성공 알림 (선택사항)
                // alert('거래가 삭제되었습니다.');
            } else {
                alert('거래 삭제 실패: ' + (result.error?.message || '알 수 없는 오류'));
            }
        } catch (error) {
            console.error('삭제 중 에러:', error);
            alert('거래 삭제 중 오류가 발생했습니다.');
        }
    };

    // 스타일 객체 생성 (colors 의존성)
    const s = styles(colors);

    // 거래 내역 렌더링
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[s.transactionCard, { backgroundColor: colors.cardBackground, borderColor: item.isAnomaly ? '#FCA5A5' : 'transparent', borderWidth: item.isAnomaly ? 1 : 0 }]}
            onPress={() => handleTransactionClick(item)}
            activeOpacity={0.7}
        >
            <View style={s.transactionHeader}>
                <View style={s.merchantInfo}>
                    <Text style={[s.merchant, { color: colors.text }]}>{item.merchant}</Text>
                    {item.isAnomaly && <Text style={{ fontSize: 10, color: '#EF4444', fontWeight: 'bold', marginLeft: 4 }}>[!] 이상거래</Text>}
                    <Text style={s.cardTypeBadge(item.cardType)}>{item.cardType || '카드'}</Text>
                </View>
                <Text style={s.amount}>{formatCurrency(item.amount)}</Text>
            </View>
            <View style={s.transactionDetails}>
                <Text style={[s.category, { color: colors.textSecondary }]}>{mapCategory(item.category)} | {item.date}</Text>
            </View>
            {
                item.notes ? (
                    <Text style={[s.notes, { color: item.isAnomaly ? '#EF4444' : colors.text }]} numberOfLines={1}>{item.notes}</Text>
                ) : null
            }
        </TouchableOpacity >
    );

    // 거래 내역 화면
    return (
        <LinearGradient colors={colors.screenGradient} style={styles(colors).container}>
            {/* Search Bar */}
            <View style={[s.searchContainer, { backgroundColor: colors.cardBackground, borderBottomColor: colors.border }]}>
                <Feather name="search" size={20} color={colors.textSecondary} style={s.searchIcon} />
                <TextInput
                    style={[s.searchInput, { color: colors.text }]}
                    placeholder="거래 내역 검색..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')} style={s.clearButton}>
                        <Feather name="x" size={18} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>

            {anomalyMode && (
                <View style={{ backgroundColor: '#FEF2F2', padding: 12, borderBottomWidth: 1, borderBottomColor: '#FCA5A5', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Feather name="alert-triangle" size={18} color="#EF4444" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#991B1B', fontWeight: 'bold' }}>이상거래 탐지 내역</Text>
                    </View>
                    <TouchableOpacity onPress={() => setAnomalyMode(false)}>
                        <Text style={{ color: '#EF4444', textDecorationLine: 'underline', fontSize: 13 }}>전체 보기</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={{ padding: 16, paddingBottom: 0 }}>
                <Text style={[s.subtitle, { color: colors.textSecondary }]}>
                    {searchQuery ? `검색 결과 ${filteredTransactions.length}건` : `총 ${filteredTransactions.length}건`}
                </Text>
            </View>

            {anomalyLoading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={{ marginTop: 10, color: colors.textSecondary }}>이상거래 내역 불러오는 중...</Text>
                </View>
            ) : (
                <ScrollView style={{ flex: 1 }}>
                    {/* AI Prediction Card */}
                    {transactions.length > 0 && (
                        <View style={styles(colors).predictionCard}>
                            <View style={styles(colors).predictionHeader}>
                                <Text style={styles(colors).predictionIcon}></Text>
                                <Text style={styles(colors).predictionTitle}>AI 다음 소비 예측</Text>
                            </View>

                            {prediction !== null ? (
                                <Text style={styles(colors).predictionText}>
                                    현재 소비 패턴 분석 결과, 다음 거래는
                                    <Text style={{ fontWeight: '800', color: '#2563EB', fontSize: 18, backgroundColor: '#DBEAFE', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                                        {prediction}
                                    </Text>
                                    카테고리일 확률이 높습니다.
                                </Text>
                            ) : (
                                <Text style={styles(colors).predictionText}>
                                    최근 거래 데이터를 분석하여 다음 소비 패턴을 예측합니다.
                                </Text>
                            )}

                            <TouchableOpacity
                                style={[styles(colors).predictionButton, isPredicting && styles(colors).predictionButtonDisabled]}
                                onPress={fetchPrediction}
                                disabled={isPredicting}
                            >
                                {isPredicting ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={styles(colors).predictionButtonText}>
                                        {prediction !== null ? '다시 예측하기' : '다음 소비 예측하기'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* 쿠폰 발급 알림 배너 */}
                    {couponNotification && (
                        <View style={styles(colors).couponBannerTop}>
                            <TouchableOpacity onPress={() => setCouponNotification(null)} style={styles(colors).couponBannerCloseTop}>
                                <Text style={{ fontSize: 20, color: '#1E40AF' }}>✕</Text>
                            </TouchableOpacity>
                            <Text style={styles(colors).couponBannerTitleTop}>추천 쿠폰 도착!</Text>
                            <View style={styles(colors).couponBannerCouponTop}>
                                <Text style={styles(colors).couponBannerMerchant}>{couponNotification.couponInfo.merchant}</Text>
                                <Text style={styles(colors).couponBannerDiscount}>{couponNotification.couponInfo.discount.toLocaleString()}원 할인</Text>
                            </View>
                            <View style={styles(colors).couponBannerInfoTop}>
                                <Text style={styles(colors).couponBannerInfoText}>다음 소비 예측: <Text style={{ fontWeight: 'bold' }}>{couponNotification.category}</Text></Text>
                                <Text style={styles(colors).couponBannerInfoText}>신뢰도: {(couponNotification.confidence * 100).toFixed(1)}%</Text>
                            </View>
                            <TouchableOpacity
                                style={styles(colors).couponBannerButtonTop}
                                onPress={async () => {
                                    try {
                                        // API로 쿠폰 발급
                                        const { issueCoupon } = await import('../api/coupons');
                                        await issueCoupon(
                                            couponNotification.couponInfo.merchant,
                                            couponNotification.couponInfo.discount
                                        );
                                        alert('쿠폰이 발급되었습니다!');
                                    } catch (error) {
                                        // 중복 발급 등 에러 메시지 표시
                                        const message = error.response?.data?.detail || '쿠폰 발급에 실패했습니다.';
                                        alert(message);
                                    }
                                    navigation.navigate('쿠폰함');
                                    setCouponNotification(null);
                                }}
                            >
                                <Text style={styles(colors).couponBannerButtonTextTop}>쿠폰함에서 확인하기 →</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Transaction List - Nested approach or ScrollView wrap depends on platform, but FlatList should be outside or scrollEnabled={false} if inside ScrollView */}
                    <FlatList
                        data={filteredTransactions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={s.listContainer}
                        ListEmptyComponent={
                            <EmptyState
                                title={anomalyMode ? "탐지된 이상거래가 없습니다" : "연동된 거래내역이 없습니다"}
                                description={anomalyMode ? "모든 거래가 안전합니다." : "프로필에서 데이터를 동기화하여\n소비 분석을 시작하세요"}
                                actionText={anomalyMode ? "전체 거래 보기" : "동기화 하러 가기"}
                                onAction={() => anomalyMode ? setAnomalyMode(false) : navigation.navigate('프로필')}
                            />
                        }
                        scrollEnabled={false}
                    />
                </ScrollView>
            )}

            {/* Floating Action Button for Add Transaction */}
            <TouchableOpacity
                style={[s.fab, { backgroundColor: colors.primary }]}
                onPress={() => setAddModalVisible(true)}
            >
                <Feather name="plus" size={24} color="#FFF" />
            </TouchableOpacity>

            {/* Detail Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={s.modalOverlay}>
                    <View style={[s.modalContent, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                        {selectedTransaction && (
                            <>
                                <View style={[s.modalHeader, { borderBottomColor: colors.border }]}>
                                    <Text style={[s.modalMerchant, { color: colors.text }]}>{selectedTransaction.merchant}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <Text style={[s.modalBusinessName, { color: colors.textSecondary }]}>{selectedTransaction.businessName}</Text>
                                        <Text style={s.cardTypeBadge(selectedTransaction.cardType)}>{selectedTransaction.cardType}</Text>
                                    </View>
                                </View>

                                <View style={[s.detailSection, { borderBottomColor: colors.border }]}>
                                    <View style={[s.detailRow, { borderBottomColor: colors.border + '40' }]}>
                                        <Text style={[s.detailLabel, { color: colors.textSecondary }]}>금액</Text>
                                        <Text style={[s.detailValueAmount, { color: colors.error }]}>{formatCurrency(selectedTransaction.amount)}</Text>
                                    </View>
                                    <View style={[s.detailRow, { borderBottomColor: colors.border + '40' }]}>
                                        <Text style={[s.detailLabel, { color: colors.textSecondary }]}>카테고리</Text>
                                        <Text style={[s.detailValue, { color: colors.text }]}>{selectedTransaction.category}</Text>
                                    </View>
                                    <View style={[s.detailRow, { borderBottomColor: colors.border + '40' }]}>
                                        <Text style={[s.detailLabel, { color: colors.textSecondary }]}>일시</Text>
                                        <Text style={[s.detailValue, { color: colors.text }]}>{selectedTransaction.date}</Text>
                                    </View>
                                    <View style={[s.detailRow, { borderBottomColor: 'transparent' }]}>
                                        <Text style={[s.detailLabel, { color: colors.textSecondary }]}>메모</Text>
                                        {isEditingNote ? (
                                            <View style={s.noteEditContainer}>
                                                <TextInput
                                                    style={[s.noteInput, { color: colors.text, borderColor: colors.border, backgroundColor: colors.background }]}
                                                    value={editedNote}
                                                    onChangeText={setEditedNote}
                                                    autoFocus
                                                />
                                                <TouchableOpacity onPress={handleSaveNote} style={s.noteSaveButton}>
                                                    <Text style={s.noteSaveText}>저장</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ) : (
                                            <TouchableOpacity onPress={() => setIsEditingNote(true)} style={s.noteClickable}>
                                                <Text style={[s.detailValue, { color: colors.text }]}>{selectedTransaction.notes || '(없음)'}</Text>
                                                <Feather name="edit-2" size={14} color={colors.textSecondary} style={s.noteEditHint} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={s.modalActions}>
                                    {selectedTransaction.isAnomaly ? (
                                        <>
                                            {selectedTransaction.status !== 'reported' && (
                                                <TouchableOpacity
                                                    style={[s.actionButton, { backgroundColor: '#E5E7EB' }]}
                                                    onPress={handleIgnoreAnomaly}
                                                >
                                                    <Feather name="eye-off" size={18} color="#4B5563" />
                                                    <Text style={{ color: '#4B5563', fontWeight: 'bold' }}>무시하기</Text>
                                                </TouchableOpacity>
                                            )}

                                            {selectedTransaction.status === 'reported' ? (
                                                <TouchableOpacity
                                                    style={[s.actionButton, { backgroundColor: '#FEE2E2', opacity: 0.6 }]}
                                                    disabled={true}
                                                >
                                                    <Feather name="check" size={18} color="#EF4444" />
                                                    <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>신고 완료</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity
                                                    style={[s.actionButton, { backgroundColor: '#FEE2E2' }]}
                                                    onPress={handleReportAnomaly}
                                                >
                                                    <Feather name="alert-triangle" size={18} color="#EF4444" />
                                                    <Text style={{ color: '#EF4444', fontWeight: 'bold' }}>신고하기</Text>
                                                </TouchableOpacity>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <TouchableOpacity
                                                style={[s.actionButton, s.deleteButton]}
                                                onPress={handleDeleteTransaction}
                                                activeOpacity={0.7}
                                            >
                                                <Feather name="trash-2" size={18} color="#EF4444" />
                                                <Text style={s.deleteButtonText}>삭제</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={[s.actionButton, s.anomalyButton]} onPress={handleMarkAsAnomaly}>
                                                <Feather name="alert-triangle" size={18} color="#F59E0B" />
                                                <Text style={s.anomalyButtonText}>이상거래 신고</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={[s.closeButton, { backgroundColor: colors.background, borderColor: colors.border }]}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={[s.closeButtonText, { color: colors.text }]}>닫기</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                visible={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                onSuccess={() => {
                    setAddModalVisible(false);
                    // 새 거래 추가 시 이상거래 탐지 재실행
                    fetchAnomalies();
                }}
            />

            {/* Anomaly Category Modal (Placeholder for explicit implementation if needed) */}
            {/* ... keeping existing logic if any ... */}
        </LinearGradient >
    );
}

// 스타일
const styles = (colors) => StyleSheet.create({
    container: { flex: 1 },
    listContainer: { padding: 16, paddingBottom: 100 },
    transactionCard: {
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    transactionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    merchantInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    merchant: { fontSize: 16, fontWeight: 'bold' },
    cardTypeBadge: (type) => ({
        fontSize: 11,
        color: type === '신용' ? '#2563EB' : '#059669',
        backgroundColor: type === '신용' ? '#DBEAFE' : '#D1FAE5',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
        fontWeight: '600',
        overflow: 'hidden',
    }),
    amount: { fontSize: 18, fontWeight: '700', color: '#2563EB' },
    transactionDetails: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    category: { fontSize: 14 },
    date: { fontSize: 12 },
    notes: { fontSize: 12, marginTop: 4, fontStyle: 'italic' },

    // Search styles
    searchContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1 },
    searchIcon: { fontSize: 20, marginRight: 12 },
    searchInput: { flex: 1, fontSize: 16, padding: 0 },
    clearButton: { padding: 8 },

    // Modal styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: { borderRadius: 16, padding: 24, width: '100%', maxWidth: 500, borderWidth: 1 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    modalHeader: { alignItems: 'center', marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1 },
    modalMerchant: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
    modalBusinessName: { fontSize: 13 },

    detailSection: { marginBottom: 20, paddingBottom: 16, borderBottomWidth: 1 },
    detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 },
    detailLabel: { fontSize: 14, flex: 0.4 },
    detailValue: { fontSize: 14, flex: 0.6, textAlign: 'right' },
    detailValueAmount: { fontSize: 16, fontWeight: 'bold', flex: 0.6, textAlign: 'right' },

    noteClickable: { flex: 0.6, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 8 },
    noteEditHint: { fontSize: 14, opacity: 0.5 },
    noteEditContainer: { flex: 0.6, flexDirection: 'row', gap: 8, alignItems: 'center' },
    noteInput: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 8, fontSize: 14 },
    noteSaveButton: { backgroundColor: '#10B981', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
    noteSaveText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

    // Action Buttons
    modalActions: { flexDirection: 'row', gap: 12, marginBottom: 16 },
    actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 8, gap: 6 },
    deleteButton: { backgroundColor: '#FEE2E2' },
    deleteButtonText: { color: '#EF4444', fontWeight: 'bold', fontSize: 14 },
    anomalyButton: { backgroundColor: '#FEF3C7' },
    anomalyButtonText: { color: '#F59E0B', fontWeight: 'bold', fontSize: 14 },

    closeButton: { padding: 14, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
    closeButtonText: { fontWeight: 'bold', fontSize: 14 },

    // Add Modal Styles
    inputGroup: { marginBottom: 16 },
    label: { fontSize: 14, marginBottom: 8, fontWeight: '500' },
    input: { borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 16 },
    modalButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
    modalButtonCancel: { flex: 1, padding: 14, borderRadius: 8, borderWidth: 1, alignItems: 'center' },
    modalButtonConfirm: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center' },
    modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    modalButtonTextCancel: { fontWeight: 'bold', fontSize: 16 },

    // FAB
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },

    // Prediction Card styles
    predictionCard: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 20,
        backgroundColor: '#DBEAFE',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#93C5FD',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    predictionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    predictionIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    predictionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1E40AF',
    },
    predictionText: {
        fontSize: 14,
        color: '#1E3A8A',
        lineHeight: 22,
        marginBottom: 16,
    },
    predictionButton: {
        backgroundColor: '#2563EB',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    predictionButtonDisabled: {
        backgroundColor: '#93C5FD',
        opacity: 0.5,
    },
    predictionButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    // Coupon Banner styles
    couponBanner: {
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        backgroundColor: '#ECFDF5',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#10B981',
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    couponBannerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    couponBannerIcon: {
        fontSize: 24,
        marginRight: 8,
    },
    couponBannerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#059669',
        flex: 1,
    },
    couponBannerClose: {
        padding: 4,
    },
    couponBannerInfo: {
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#A7F3D0',
    },
    couponBannerText: {
        fontSize: 14,
        color: '#065F46',
        marginBottom: 4,
        lineHeight: 20,
    },
    couponBannerCoupon: {
        backgroundColor: '#D1FAE5',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
    },
    couponBannerCouponText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#047857',
        textAlign: 'center',
    },
    couponBannerButton: {
        backgroundColor: '#10B981',
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    couponBannerButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },

    // Top Coupon Banner
    couponBannerTop: {
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        padding: 24,
        backgroundColor: '#DBEAFE',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#93C5FD',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
        position: 'relative',
    },
    couponBannerCloseTop: {
        position: 'absolute',
        top: 12,
        right: 12,
        padding: 8,
        zIndex: 10,
    },
    couponBannerTitleTop: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1E40AF',
        textAlign: 'center',
        marginBottom: 16,
    },
    couponBannerCouponTop: {
        backgroundColor: '#EFF6FF',
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#93C5FD',
    },
    couponBannerMerchant: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1E40AF',
        marginBottom: 6,
    },
    couponBannerDiscount: {
        fontSize: 28,
        fontWeight: '800',
        color: '#2563EB',
    },
    couponBannerInfoTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    couponBannerInfoText: {
        fontSize: 16,
        color: '#1E3A8A',
        fontWeight: '600',
    },
    couponBannerButtonTop: {
        backgroundColor: '#2563EB',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    couponBannerButtonTextTop: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
