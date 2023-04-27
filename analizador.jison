/* lexical grammar */
%lex
%options case-insensitive
%%

\s+                   /* skip whitespace */
"//".*                 //comentario lineal
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas   

"int"                   return 'Rint'
"double"                return 'Rdouble'
"boolean"               return 'Rboolean'
"char"                  return 'Rchar'
"string"                return 'Rstring'
"if"                    return 'Rif'
"else"                  return 'Relse'
"switch"                return 'Rswitch'
"case"                  return 'Rcase'
"default"               return 'Rdefault'
"break"                 return 'Rbreak'
"return"                return 'Rreturn'
"for"                   return 'Rfor'
"while"                 return 'Rwhile'
"do"                    return 'Rdo'
"list"                  return 'Rlist'
"void"                  return 'Rvoid'
"print"                 return 'Rprint'
"true"                  return 'Rtrue'
"false"                 return 'Rfalse'
"main"                  return 'Rmain'
"new"                   return 'Rnew'
[0-9]+("."[0-9]+)\b    return 'decimal'
"."                     return 'punto'
[0-9]+\b                return 'entero'
"=="                   return 'igualigual'       
"!="                  return 'diferente'
"<="                    return 'menorIgual'
"<"                   return 'menor'
">="                  return 'mayorIgual'
"="                     return 'igual'
">"                   return 'mayor'
","                   return 'coma'
";"                   return 'ptcoma'
":"                   return 'dospuntos'
"?"                   return 'inter'
"||"                  return 'or'
"&&"                  return 'and'
"{"                   return 'llaveA'
"}"                   return 'llaveC'
"*"                   return 'multi'
"/"                   return 'div'
"--"                  return 'menosmenos'
"++"                  return 'masmas'   
"-"                   return 'menos'
"+"                   return 'suma'
"^"                   return 'exponente'
"!"                   return 'not'
"%"                   return 'modulo'
"("                   return 'parA'
")"                   return 'parC'
"["                   return 'corchA'
"]"                   return 'corchC'

([a-zA-Z])([a-zA-Z0-9_])*               return 'identificador'
["\""]([^"\""])*["\""]                  return 'string'
["\'"]([^"\'"])*["\'"]                  return 'char'

<<EOF>>               return 'EOF'
.                     {
        
        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);
}

/lex
%{
        const TIPO_OPERACION= require('./controladores/Enums/TipoOperacion');
        const TIPO_VALOR = require('./controladores/Enums/TipoValor');
        const TIPO_DATO= require('./controladores/Enums/TipoDato');
        const INSTRUCCION = require('./controladores/Instruccion/Instruccion');
    
%}

/* operator associations and precedence */
%left 'Rreturn'
%left 'or'
%left 'and'
%right 'not'
%left 'Rbreak' 'inter' 'igualigual' 'menor' 'menorIgual' 'mayor' 'mayorIgual' 'diferente'
%left 'suma' 'menos'
%left 'multi' 'div' 'modulo' 
%nonassoc 'exponente'
%left umenos 
%left ucasteo

%start INICIO

%% /* language grammar */

INICIO: OPCIONESCUERPO EOF{return $1;}
        ;

OPCIONESCUERPO: OPCIONESCUERPO CUERPO{$1.push($2); $$=$1;}
                |CUERPO {$$=[$1];}
                ;

CUERPO: DEC_VAR ptcoma {$$=$1;}                               //DECLARACION DE CADA COMPONENTE DEL CUERPO DE MANERA RECURSIVA
        |ASIG_VAR ptcoma {$$=$1;}
        |METODOS {$$=$1;}
        |FUNCIONES {$$=$1;}
        |MAIN {$$=$1;} 
        ;

METODOS: Rvoid identificador parA parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, null, $6, this._$.first_line,this._$.first_column+1)} 
        | Rvoid identificador parA LIST_PARAMETROS parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoMetodo($2, $4, $7, this._$.first_line,this._$.first_column+1)}
;

FUNCIONES: TIPO identificador parA LIST_PARAMETROS parC llaveA INSTRUCCIONES Rreturn EXPRESION ptcoma llaveC {$$ = INSTRUCCION.nuevaFuncion($1,$2,$4,$7,$9, this._$.first_line , this._$.first_column+1)}
        |  TIPO identificador parA LIST_PARAMETROS parC llaveA Rreturn EXPRESION ptcoma llaveC {$$ = INSTRUCCION.nuevaFuncion($1,$2,$4,null,$8, this._$.first_line , this._$.first_column+1)}
;

LIST_PARAMETROS: LIST_PARAMETROS coma PARAMETROS {$1.push($3); $$=$1;}  
        |PARAMETROS {$$=[$1];}
;

PARAMETROS: TIPO identificador {$$ = INSTRUCCION.nuevaDeclaracion($2, null, $1, this._$.first_line,this._$.first_column+1)}   
;

MAIN: Rmain identificador parA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, null, this._$.first_line,this._$.first_column+1)} 
      |Rmain identificador parA PARAMETROS_LLAMADA parC ptcoma {$$ = INSTRUCCION.nuevoMain($2, $4, this._$.first_line,this._$.first_column+1)}

;

PARAMETROS_LLAMADA: PARAMETROS_LLAMADA coma EXPRESION {$$ = $1; $1.push($3);}
                |EXPRESION {$$ = [$1];}
;

DEC_VAR: TIPO identificador  {$$= INSTRUCCION.nuevaDeclaracion($2,null, $1,this._$.first_line, this._$.first_column+1)}
        |TIPO identificador igual EXPRESION  {$$= INSTRUCCION.nuevaDeclaracion($2, $4, $1,this._$.first_line, this._$.first_column+1);}
        ;

ASIG_VAR: identificador igual EXPRESION {$$ = INSTRUCCION.nuevaAsignacion($1, $3,this._$.first_line, this._$.first_column+1)}
;

TIPO: Rint{$$= TIPO_DATO.ENTERO}
    |Rdouble{$$= TIPO_DATO.DECIMAL}
    |Rchar {$$= TIPO_DATO.CHAR}
    |Rboolean{$$= TIPO_DATO.BOOL}
    |Rstring {$$= TIPO_DATO.CADENA}
;

INSTRUCCIONES: INSTRUCCIONES INSTRUCCION {$$ = $1; $1.push($2);}
            |INSTRUCCION {$$ = [$1];}
;

INSTRUCCION: DEC_VAR ptcoma {$$=$1;}                                           //DECLARACION DE CADA COMPONENTE DEL CUERPO DE MANERA RECURSIVA
        |ASIG_VAR ptcoma {$$=$1;}
        |METODO_INSTR_SINPARAMETROS ptcoma{$$=$1;}
        |METODO_INSTR_PARAMETROS{$$=$1;}
        |PRINT {$$=$1;}
        |IF {$$=$1;}
        |FOR {$$=$1;}
        |WHILE {$$=$1;}
        |DOWHILE {$$=$1;}
        |INCREMENTOYDECREMENTO ptcoma {$$=$1;}
        |LISTA {$$=$1;}
        |SWITCH {$$=$1;}
        |Rreturn ptcoma{$$ = INSTRUCCION.nuevoReturn(null, this._$.first_line,this._$.first_column+1)}
        |Rreturn EXPRESION ptcoma {$$ = INSTRUCCION.nuevoReturn($2, this._$.first_line,this._$.first_column+1) }

;

METODO_INSTR_SINPARAMETROS: identificador parA parC { $$ = INSTRUCCION.nuevoEjecMetodo($1, null, this._$.first_line,this._$.first_column+1) }
;

METODO_INSTR_PARAMETROS: identificador parA PARAMETROS_LLAMADA parC ptcoma { $$ = INSTRUCCION.nuevoEjecMetodo($1, $3, this._$.first_line,this._$.first_column+1) }
;

PRINT: Rprint parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoPrint($3, this._$.first_line,this._$.first_column+1);}
;
//TIPOS DE IF
IF: Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoIf($3, $6, this._$.first_line, this._$.first_column+1);}
        |Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC Relse llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoIfElse($3, $6, $10 , this._$.first_line,this._$.first_column+1)}
        | Rif parA EXPRESION parC llaveA INSTRUCCIONES  llaveC ELSEIF  {$$= INSTRUCCION.nuevoIfConElseIf($3, $6, $8, null, this._$.first_line,this._$.first_column+1)}
        | Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC ELSEIF Relse llaveA INSTRUCCIONES llaveC {$$= INSTRUCCION.nuevoIfConElseIf($3, $6, $8, $11, this._$.first_line,this._$.first_column+1)}
;
ELSEIF:ELSEIF CONEIF {$1.push($2); $$=$1;}
      | CONEIF {$$=[$1];}
; 
CONEIF: Relse Rif parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoElseIf($4, $7, this._$.first_line, this._$.first_column+1) }
;
//TIPOS DE SWTICH
SWITCH: Rswitch parA EXPRESION parC llaveA CASES llaveC {$$ = INSTRUCCION.nuevoSwitch($3, $6, this._$.first_line, this._$.first_column+1)}
;

CASES: CASES CASEN {$1.push($2); $$=$1;}
     | CASEN {$$ = [$1];}
;
CASEN: CASE dospuntos INSTRUCCIONES Rbreak ptcoma { $$ = INSTRUCCION.nuevoCase($1, $3, this._$.first_line, this._$.first_column+1);}
;
CASE: Rcase EXPRESION {$$ = $2;}
    | Rdefault        {$$ = {valor:$1};}
;

//CICLO FOR
FOR: Rfor parA DEC_VAR ptcoma EXPRESION ptcoma INCREMENTOYDECREMENTO parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoFor($3, $5, $7, $10, this._$.first_line, this._$.first_column+1)}
;
//CICLO WHILE
WHILE: Rwhile parA EXPRESION parC llaveA INSTRUCCIONES llaveC {$$ = INSTRUCCION.nuevoWhile($3, $6, this._$.first_line, this._$.first_column+1);}
;
//CICLO DO WHILE
DOWHILE: Rdo llaveA INSTRUCCIONES llaveC Rwhile parA EXPRESION parC ptcoma {$$ = INSTRUCCION.nuevoDoWhile($7, $3, this._$.first_line, this._$.first_column+1);}
;
//LISTAS
LISTA: Rlist menor TIPO mayor identificador igual Rnew Rlist menor TIPO mayor ptcoma {$$= INSTRUCCION.nuevoLista($5, $3, this._$.first_line, this._$.first_column+1)}
;

INCREMENTOYDECREMENTO: identificador masmas {$$ =  INSTRUCCION.nuevoIncremento($1, $2, INSTRUCCION.nuevaOperacionBinaria($1, 1 ,TIPO_OPERACION.SUMA, this._$.first_line, this._$.first_column+1), this._$.first_line, this._$.first_column+1)}
                     | identificador menosmenos {$$ =  INSTRUCCION.nuevoDecremento($1, $2, INSTRUCCION.nuevaOperacionBinaria($1, 1, TIPO_OPERACION.RESTA, this._$.first_line, this._$.first_column+1), this._$.first_line, this._$.first_column+1)}
;

EXPRESION: EXPRESION suma EXPRESION{$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.SUMA,this._$.first_line, this._$.first_column+1);}
         | identificador parA PARAMETROS_LLAMADA parC { $$ = INSTRUCCION.nuevaEjecFuncion($1, $3, this._$.first_line,this._$.first_column+1) }  
         | parA TIPO parC EXPRESION %prec ucasteo {$$ = INSTRUCCION.nuevoCasteo($2,$4,this._$.first_line, this._$.first_column+1);}
         | EXPRESION inter EXPRESION dospuntos EXPRESION {$$ = INSTRUCCION.nuevoTernario($1, $3, $5, TIPO_OPERACION.TERNARIO,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menos EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.RESTA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION multi EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MULTIPLICACION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION div EXPRESION   {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIVISION,this._$.first_line, this._$.first_column+1);}
         | EXPRESION exponente EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.POTENCIA,this._$.first_line, this._$.first_column+1);}
         | EXPRESION modulo EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MODULO,this._$.first_line, this._$.first_column+1);} 
         | EXPRESION menor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayor EXPRESION    {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYOR,this._$.first_line, this._$.first_column+1);}
         | EXPRESION menorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MENORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION mayorIgual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.MAYORIGUAL,this._$.first_line, this._$.first_column+1);}
         | EXPRESION diferente EXPRESION  {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.DIFERENTE,this._$.first_line, this._$.first_column+1);}
         | EXPRESION and EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.AND,this._$.first_line, this._$.first_column+1);}
         | EXPRESION or EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.OR,this._$.first_line, this._$.first_column+1);}
         | menos EXPRESION %prec umenos {$$= INSTRUCCION.nuevaOperacionUnaria($2, TIPO_OPERACION.UNARIA,this._$.first_line, this._$.first_column+1);}
         | not EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria(null,$2, TIPO_OPERACION.NOT,this._$.first_line, this._$.first_column+1);}
         | parA EXPRESION parC {$$=$2}
         | EXPRESION igualigual EXPRESION {$$= INSTRUCCION.nuevaOperacionBinaria($1,$3, TIPO_OPERACION.IGUALIGUAL,this._$.first_line, this._$.first_column+1);}
         | decimal {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.DECIMAL,this._$.first_line, this._$.first_column+1);}
         | entero {$$= INSTRUCCION.nuevoValor(Number($1),TIPO_VALOR.ENTERO,this._$.first_line, this._$.first_column+1);}
         | Rtrue {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | Rfalse {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.BOOL,this._$.first_line, this._$.first_column+1);}
         | string {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CADENA,this._$.first_line, this._$.first_column+1);}
         | identificador{$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.IDENTIFICADOR,this._$.first_line, this._$.first_column+1);}
         | char {$$= INSTRUCCION.nuevoValor($1,TIPO_VALOR.CHAR,this._$.first_line, this._$.first_column+1);}
;    