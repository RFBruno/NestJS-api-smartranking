import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>
    ){}

    private readonly logger = new Logger();

    public async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const {email} = criarJogadorDto;
        const jogadorEncontrado = await this.consultarJogadorPeloEmail(email);

        if(jogadorEncontrado){  
            throw new BadRequestException(`Jogador com email ${email} já cadastrado`);
        }
         
        const jogadorCriado = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriado.save();
        
    }

    public async atualizarJogador(_id:string ,atualizarJogadorDto: AtualizarJogadorDto): Promise<void>{
        
        const jogadorEncontrado = await this.consultarJogadorPeloId(_id);

        if(!jogadorEncontrado){  
            throw new BadRequestException(`Jogador com o ID ${_id} não encontrado`);
        }

        await this.jogadorModel.findOneAndUpdate({_id},{$set: atualizarJogadorDto}).exec();
        
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

    public async consultarJogadorPeloId(_id: string): Promise<Jogador>{
        
        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
        console.log(jogadorEncontrado);
        
        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        };
        

        return jogadorEncontrado;
    }

    public async deletarJogador(_id: string): Promise<void>{
        const jogadorEncontrado = await this.consultarJogadorPeloId(_id);

        if(!jogadorEncontrado){
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        
        await this.jogadorModel.deleteOne({_id}).exec();
        return;
    }

}
