% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/json)).

% Algoritmos
:- consult('caminhos.pl').
:- consult('parsers.pl').


% Start Prolog Server on Port: 5000
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).


:- http_handler('/findPath', find_path_handler, []).

find_path_handler(Request) :-
    cors_enable(Request, [methods([get])]),
    % Extract parameters from the request
    http_parameters(Request, [algoritmo(A, []),origem(O,[]),destino(D,[])]),

    parse_ponto_acesso(O, ParsedOrigem),
    parse_ponto_acesso(D, ParsedDestino),

    % phrase(parse_ponto_acesso(Origem), [O]),
    % % For testing, use fixed values
    % Algoritmo = dfs,
    % Origem = pass(a2,b2),
    % Destino = pass(b2,c3),

    % Calling the predicate with the fixed values
    find_caminho(A, ParsedOrigem, ParsedDestino, ListaCaminho, ListaMovimentos, Custo),
    % find_caminho_entidades(Algoritmo, Origem, Destino, ListaCaminho, ListaMovimentos, Custo),

    convert_lista_caminho(ListaCaminho, CaminhoJson),
    convert_lista_movimentos(ListaMovimentos, MovimentosJson),
    reply_json(json{caminho: CaminhoJson, movimentos: MovimentosJson, variavel: Custo },[json_object(dict)]).
