import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import tachyons from 'tachyons'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Surgery Log</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="f3 tc">
          Welcome to Surgery Log 
        </h1>
      

        <form className="mw5 mw7-ns center bg-transparent pa3 ba b--silver br3">
          <div>
            <label htmlFor="email_address">Email </label><br></br>
            <input 
                id="email_address" 
                type="email" 
                name="email_address" 
                className="mt1 ba b--silver br2"
                pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" 
                required></input>
          </div>
          <div>
            <label htmlFor="password">Password </label><br></br>
            <input id="password" type="password" name="password" className="mt1 ba b--silver br2"></input>
          </div>
          <div>
            <input type="button" id="submit_login" value="Submit" className="mt1 ba b--silver br2"></input>
          </div>
          <div>
            <Link href="/webpages/register">
             <a>New User, register here !!</a>
            </Link>
              
            
          </div>
        </form>

        {/* <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}



