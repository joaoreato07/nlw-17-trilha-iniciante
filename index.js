const { select, input, checkbox } = require("@inquirer/prompts")

let mensagem ="Bem vindo ao APP de metas";
let meta = {
    value:"Tomar 3L de agua por dia",
    checked:false,
}
let metas = [meta]

const cadastarMeta = async () =>{
    const meta = await input({message:"Digite a Meta"})

    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia"
        return
    }

    metas.push({ 
        value:meta, checked:false}
    )

    mensagem = "Meta cadastrada com sucesso"

}

const listarMetas = async ()=>{
    const respostas = await checkbox({
        message:"Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices:[...metas],
        instructions:false,
    })

    metas.forEach((m)=> {
        m.checked = false
    })

    if(respostas == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }

    

    respostas.forEach((resposta) =>{
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Metas marcadas como concluidas"
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) =>{
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("não existem metas realizadas ;(")
        return

    }

    await select({
        message: "metas realizadas" + realizadas.length,
        choices:[...realizadas]
    })

}

const metasAbertas = async() => {
    const abertas = metas.filter((metas) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = "Não existe metas abertas!"
        return
    }

    await select({
        message: "Metas abertas" + abertas.length,
        choices:[...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked: false}
    })
    const itemADeletar = await checkbox({
        message:"Selecione item para deletar",
        choices:[...metasDesmarcadas],
        instructions:false,
    })

    if(itemADeletar.length == 0){
        mensagem = "Nenhum item a deletar"
        return
    }

    itemADeletar.forEach((item)=>{
       metas = metas.filter((meta)=>{
        return meta.value != item
       })
    })

   mensagem = "metas deletadas com sucesso"

}

const mostrarMensagem = ()=>{
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }

}

const start = async() => {

    
    while(true){
        mostrarMensagem()
        
        const opcao = await select({
            message:"Menu >",
            choices: [
                {
                    name:"Cadastrar meta",
                    value:"cadastrar"
                },
                {
                    name:"Listar meta",
                    value:"listar"
                },
                {
                    name:"Metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"Metas abertas",
                    value:"abertas"
                },
                {
                    name:"Deletar metas",
                    value:"deletar"
                },
                {
                    name:"Sair",
                    value:"sair"
                }
            ]
        })


        switch(opcao){
            case  "cadastrar":
                await cadastarMeta()
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Até mais")
                return
        }
    }
    
}
start()