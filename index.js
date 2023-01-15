const { createApp } = Vue
createApp({
    data() {
        return {
            recordatorios: JSON.parse(localStorage.getItem('recordatorios')) || [],
            texto: ""
        }
    },
    methods: {
        cambiarPrioridad(entrada, prioridad){
            entrada.prioridad = prioridad;
            localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios))
        },

        nuevoRecordatorio(){
            let long = this.recordatorios.length;
            let info = {
                id: long + 1,
                titulo: this.texto,
                hecho: false,
                prioridad: 2,
                fecha: Date.now()
            };
            this.recordatorios.push(info);
            this.texto = "";
            localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
        },

        borrarRecordatorio(entrada){
            let index = this.recordatorios.indexOf(entrada);
            this.recordatorios.splice(index, 1);
            localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
        },

        marcarRecordatorio(entrada){
            entrada.hecho = !entrada.hecho;
            localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
        },

        borrarCompletados(){
            let arrayFilt = this.recordatorios.filter((entrada) => !entrada.hecho);
            this.recordatorios = arrayFilt;
            localStorage.setItem('recordatorios', JSON.stringify(this.recordatorios));
        }
    },
    computed: {
        entradasPendientes(){
            return this.recordatorios.filter((recordatorio) => recordatorio.hecho == false).length;
        },

        totalEntradas(){
            return this.recordatorios.length;
        },

        entradasFiltradas(){
            let arrayFilt = this.recordatorios.filter((entrada) => entrada.titulo.toLowerCase().includes(this.texto.toLowerCase()));
            return arrayFilt.sort(function(a, b) {
                return b.prioridad - a.prioridad;
            });
        }
    }
}).mount('#app')