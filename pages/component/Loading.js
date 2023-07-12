import style from './Loading.module.css'
const Loading = () => {
    return (
        <div className='text-center py-2' >
            <div className={style.lds_facebook}><div></div><div></div><div></div></div>
        </div> 
     );
}
 
export default Loading;