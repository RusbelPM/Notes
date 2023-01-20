import React, { useEffect } from 'react'
import{Link} from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from'validator'
import{useDispatch, useSelector}from'react-redux'
import { RemoveError, setError } from '../../actions/ui'
import { startRegister } from '../../actions/auth'

export const RegisterScreen = () => {

  const {msgError} = useSelector( state => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
    if (msgError) {
      setTimeout(() => {
        dispatch(RemoveError());
      }, 2000)
    }
  }, [msgError, dispatch])

  const [valor,onchange ] =  useForm({
    name: '',
    email: '',
    password:'',
    password1:''
  })
  const {name,email, password,password1} = valor; 
  // console.log(name,email,passwor,passwor1)s
  const handleRegister = (e)=>{
    e.preventDefault();
   if (isFormValid()){
     dispatch(startRegister(email,password,name));
   } 
  } 
  const isFormValid = ()=>{
    if (name.trim().length === 0 ) {
      dispatch(setError('incorrect'));
        return false;
      
    } else if (!validator.isEmail(email)){
      dispatch(setError('email debe tener "@","Z","Numb"'))
      return false
    } else if (password !== password1 || password.length < 6 ){
      dispatch(setError('la contraseña debe tener almenos 6 caracters'))
      return false;
    } 
    dispatch(RemoveError())
      return true;
  }


  return (
    <>
    <h3 className="auth__title">Registrar</h3>
      {

      msgError && 
      (<div className='auth__alert-error'>{msgError}</div>)
      }
      <form 
      className='animate__animated animate__fadeIn animate__faster'
      onSubmit={handleRegister}>
      <input
        type='text'
        placeholder='Nombre'
        name='name'
        className="auth__input"
        autoComplete="off"
        onChange={onchange}
        value={name}
        />
        <input
        type='text'
        placeholder='email'
        name='email'
        className="auth__input"
        autoComplete="off"
        value={email}
        onChange={onchange}
        />
         <input
        type='password'
        placeholder='Password'
        name='password'
        className="auth__input"
        autoComplete="off"
        value={password}
        onChange={onchange}
        />
        <input
       type='password'
       placeholder='Confirm Password'
       name='password1'
       className="auth__input"
       autoComplete="off"
       value={password1}
       onChange={onchange}
       />
        <button 
        className="btn btn-primary btn-blok mb-5"
        type="submit"
        >
          Registrar
        </button>
        <h2 className="auth__button-link">
            <Link 
            className="link"
            to={'/auth/login'}>
            ¿Estas Registrado?
            </Link>
        </h2>
         
      </form>
    </>
  )}
  