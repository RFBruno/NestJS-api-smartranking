import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { isEmpty } from 'rxjs';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

import { jogadoresValidacaoParametros } from './pipes/Jogadores-validacao-parametros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador( @Body() criaJogadorDto : CriarJogadorDto ): Promise<Jogador>{
        return await this.jogadoresService.criarJogador(criaJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto : AtualizarJogadorDto,
        @Param('_id') _id: string
        ): Promise<void>{
        this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
        return this.jogadoresService.consultarJogadores();
    }
    
    @Get('/:_id')
    async consultaJogadoresPeloId(
        @Param('_id', jogadoresValidacaoParametros) _id: string
        ): Promise<Jogador>{
            return this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        @Param('_id', jogadoresValidacaoParametros) _id: any
    ): Promise<void>{
        return this.jogadoresService.deletarJogador(_id);
    }

}
