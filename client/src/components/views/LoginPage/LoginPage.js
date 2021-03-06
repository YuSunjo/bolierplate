import React,{useState} from 'react'
import { withRouter } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {loginUser} from '../../../_actions/user_actions'

function LoginPage(props) {
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
       
        let body={
            email:Email,
            password:Password
        }
        dispatch(loginUser(body))
        .then(response=> {
            //page / 로 이동
            if(response.payload.loginSuccess){
                props.history.push('/')
            }else {
                alert('error')
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
                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
// export default LoginPage
