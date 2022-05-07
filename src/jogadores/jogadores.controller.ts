import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { get } from 'http';
import { isEmpty } from 'rxjs';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private jogadoresService: JogadoresService){}

    @Post()
    async criarAtualizarJogador( @Body() criaJogadorDto : CriarJogadorDto ){
        this.jogadoresService.criarAtualizarJogador(criaJogadorDto);
    }

    @Get()
    async consultarJogadores(
        @Query() query: any
    ): Promise<Jogador[] | Jogador>{
        if(Object.keys(query).length !== 0){
            return this.jogadoresService.consultarJogadorPeloEmail(query.email);
        }else{
            return this.jogadoresService.consultarJogadores();
        }
    }

    @Delete()
    async deletarJogador(
        @Query() query: any
    ): Promise<void>{
        return this.jogadoresService.deletarJogador(query.email);
    }

}
