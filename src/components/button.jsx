import './button.scss'

export default function Button({icon,text}) {
  return (
    <div className='button'>
     <div className='button_icon'>
          {icon}
     </div>
     {text && <div className="button_text">
          {text}
     </div>}
    </div>
  )
}
