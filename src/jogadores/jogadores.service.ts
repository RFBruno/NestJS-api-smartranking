import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
    ){}

    private readonly logger = new Logger();

    public async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{
        const {email} = criarJogadorDto;
        const jogadorEncontrado = await this.consultarJogadorPeloEmail(email);

        if(jogadorEncontrado){  
            this.atualizar(criarJogadorDto);
        }else{
            this.criar(criarJogadorDto);
        }
    }

    public async consultarJogadores(): Promise<Jogador[]>{
        return await this.jogadorModel.find().exec();
    }

    public async consultarJogadorPeloEmail(email: string): Promise<Jogador>{
        
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        console.log(jogadorEncontrado);
        
        if(!jogadorEncontrado) return;
        

        return jogadorEncontrado;
    }
    
    private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
        
        
        // const { nome, telefone, email } = criarJogadorDto;
        // const jogador: any = {
        //     nome,
        //     telefone,
        //     email,
        //     ranking: 'A',
        //     posicaoRanking: 1,
        //     urlFoto: 'www.google.com.br/foto123.jpg'
        // }
        
        // this.logger.log(`CriaJogadorDto: ${JSON.stringify(jogador)}`);
        // this.jogadores.push(jogador);
    }

    private async atualizar(jogadorDto: CriarJogadorDto): Promise<Jogador>{
        return await this.jogadorModel.findOneAndUpdate({email: jogadorDto.email},{$set: jogadorDto}).exec();
    }

    public async deletarJogador(email: string): Promise<void>{
        const jogadorEncontrado = await this.consultarJogadorPeloEmail(email);
         await this.jogadorModel.deleteOne({email}).exec();

        return;
    }

}
