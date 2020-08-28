import React,{useState} from 'react'
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_actions'

function RegisterPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler =(event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler =(event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
       
        if(Password !==ConfirmPassword){
            return alert('differnt password and ConfirmPassword. Change equal it')
        }

        let body={
            email:Email,
            password:Password,
            name:Name
        }
        dispatch(registerUser(body))
        .then(response=> {
            if(response.payload.success){
                props.history.push('/login')
            }else {
                alert('fail to sign up')
            }
        })

    }


    return (
        <div style={{display:'flex', justifyContent: 'center', alignItems:"center", width:"100%",height:"100vh"}}>
            <form style={{display: 'flex', flexDirection:"column"}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                 <label>ConfirmPassword</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    sign up
                </button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
