import { tokenAlive, jwtDecrypt } from "@/shared/jwtUtil";

const state = () => ({
    authData: {
        token: "",
        ticket: {},        
    }
});

const getters = {
    isAuthenticated(state) {
        const tokenExp = state.authData.ticket.exp;
        return tokenExp !== undefined && tokenAlive(tokenExp);
    },
    token(state) {
        return state.token;        
    },
    ticket(state) {
        return state.ticket;
    }
};

const actions = {
    saveTicket(context, ticket) {
        context.commit('saveTicket', ticket);
    }
};

const mutations = {
    saveTicket(state, token) {
        const decToken = jwtDecrypt(token);        
        state.token = token;
        state.ticket = decToken;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}