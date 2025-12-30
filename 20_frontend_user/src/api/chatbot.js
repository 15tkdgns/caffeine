import { apiClient } from './client';

/**
 * AI 챗봇에게 메시지 전송
 * @param {Object} params - 요청 파라미터
 * @param {string} params.message - 사용자 메시지
 * @param {string} params.naggingLevel - 잔소리 강도
 * @param {Array} params.history - 이전 대화 내역
 * @returns {Promise<Object>} AI 응답
 */
export const sendChatMessage = async ({ message, naggingLevel = '중', history = [], type = 'chat' }) => {
    try {
        const response = await apiClient.post('/chat', {
            message,
            naggingLevel,
            history,
            type
        });

        return {
            success: true,
            message: response.data.reply,
            mood: response.data.mood || 'neutral',
            type: 'chat'
        };
    } catch (error) {
        console.error('Chat API Error:', error);
        throw new ChatbotError(
            error.response?.data?.detail || 'AI 응답을 가져오는데 실패했습니다',
            error.response?.status || 0,
            { originalError: error.message }
        );
    }
};

/**
 * 거래에 대한 AI 평가 요청
 */
export const evaluateTransaction = async ({ transaction, naggingLevel = '중' }) => {
    try {
        const message = `이 거래 어때?:\n${transaction.merchant_name}에서 ${transaction.amount}원 결제함. 카테고리: ${transaction.category}`;
        return await sendChatMessage({ message, naggingLevel, type: 'alarm' });
    } catch (error) {
        console.error('AI 평가 실패:', error);
        return {
            success: false,
            message: null,
            error: error.message,
        };
    }
};

/**
 * 챗봇 커스텀 에러 클래스
 */
export class ChatbotError extends Error {
    constructor(message, statusCode, data = {}) {
        super(message);
        this.name = 'ChatbotError';
        this.statusCode = statusCode;
        this.data = data;
    }
}

/**
 * 기본 에러 메시지 생성
 * @param {Error} error - 에러 객체
 * @returns {string} 사용자 친화적 에러 메시지
 */
export const getErrorMessage = (error) => {
    if (error instanceof ChatbotError) {
        if (error.statusCode === 0) {
            return '네트워크 연결을 확인해주세요.';
        }
        if (error.statusCode >= 500) {
            return '서버에 문제가 생겼어요. 잠시 후 다시 시도해주세요.';
        }
        if (error.statusCode >= 400) {
            return '요청에 문제가 있어요. 다시 시도해주세요.';
        }
    }
    return '죄송해요, 잠시 문제가 생겼어요. 다시 말씀해주시겠어요?';
};
