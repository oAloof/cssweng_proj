import styles from '../styles/login.module.css'

const Login = () => {
    return ( 

        <div className={styles.mainLoginCont}>
            <img src="/logos/bxappliances_longLogoColor.png" alt="BX Appliances Logo" className={styles.bxLogo} />
            <div className={styles.headingDiv}>
                <p className={styles.loginText}>Log In</p>
                <p className={styles.welcomeText}>Welcome back!</p>
            </div>
            
        </div>

     );
}
 
export default Login;