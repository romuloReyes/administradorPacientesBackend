import Veterinario from '../models/Veterinario.js'

const registrar = async (req, res)=>{
    //console.log(req.body);
    /* const { email, password, nombre } = req.body;
    console.log(email);
    console.log(password);
    console.log(nombre); */
    
    //Prevenir usuarios duplicados 
    const { email } = req.body;
    const existeUsuario = await Veterinario.findOne({email});
    if(existeUsuario){
        const error = new Error('Usuario ya registrado');

        return res.status(400).json({msg: error.message});
    }

    try {
        //guardar un nuevo usuario veterinario 
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error)
    }

}

const perfil = (req, res)=>{
    res.json({msg:'Mostrando Perfil'});
}

const confirmar = async (req, res)=>{
    const { token } = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});

    if(!usuarioConfirmar){
        const error = new Error('Token no valido');
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario confirmado Correctamente'});

    } catch (error) {
        console.log(error);
    }
    console.log(usuarioConfirmar);
    
}

const autenticar = (req, res)=>{
    console.log(req.body)

    res.json({msg: 'Autenticando'})
}

export { registrar, perfil, confirmar, autenticar };