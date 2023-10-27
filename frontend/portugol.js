// portugol.js
CodeMirror.defineMode("portugol", function() {
    return {
        startState: function() {
            return {
                inString: false,
            };
        },
        token: function(stream, state) {
            if (stream.eatSpace()) return null;

            if(stream.match(/^(?<![\"'])(programa)(?![\"'])/)){
                return "programa"
            }
            if(stream.match(/^(?<![\"'])(funcao inicio(.*){)(?![\"'])/)){
                return "inicio"
            }

            if(stream.match(/(\=.*|\/\/.*)$/)){
                return "comment"
            }

            if (stream.match(/se|senao|enquanto|faca|para|ate|escreva|leia|inteiro|real|caractere|logico/)) {
                return "keyword";
            }

            if (stream.match(/[{}]/) || stream.match(/[}]/)) {
                return "bracket";
            }

            if (stream.match(/verdadeiro|falso/)) {
                return "atom";
            }

            if (stream.match(/\".*?\"/)) {
                return "string";
            }

            if (stream.match(/\d+/)) {
                return "number";
            }

            if (stream.match(/[a-zA-Z_][a-zA-Z0-9_]*/)) {
                return "variable";
            }

            stream.next();
            return null;
        }
    };
});

CodeMirror.defineMIME("text/x-portugol", "portugol");
