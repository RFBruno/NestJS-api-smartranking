import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    telefone: {type: String},
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFoto: String

}, {timestamps: true, collection:'jogadores'});
    