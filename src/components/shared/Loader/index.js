import style from './loader.module.scss'

const Loader = () => {
   return (
      <div className={style.content}>
         <div className={style.ellipsis}><div></div><div></div><div></div><div></div></div>
      </div >
   );
}

export default Loader;