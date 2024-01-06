import './Title.css';
function Title({ title, children }) {
    return (
        <div className="title">
            <h1 >
                {title}
            </h1>
            <div className='extension'>
                {children}
            </div>
        </div>
    )
}
export default Title;