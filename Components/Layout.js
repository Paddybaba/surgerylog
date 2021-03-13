import styles from '../Components/layout.module.css'
const Layout = ({children}) =>{
return(
    <div className={styles.postcontainer}>
        {children}
    </div>
)
}
export default Layout;