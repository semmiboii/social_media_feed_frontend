import './post.scss'

import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";

import Button from './button';

export default function Post({author,title,content,img,comments,timestamp}) {
  return (
    <div className='post_wrapper'>
          <div className="post_header">
               <img src="https://images.unsplash.com/photo-1681008570032-abdfcb23f875?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt='userImg'/>
               <span>slim_shady</span>
          </div>
          <div className="post_body"><img src='https://images.unsplash.com/photo-1682695795255-b236b1f1267d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="contentImg"/></div>
          <div className="post_footer">
               <div className='post_controls_wrapper'>
                    <div className="post_controls">
                         <Button icon={<AiOutlineLike />} />
                         <Button icon={<FiMessageCircle/>} />
                    </div>
                    <div className='post_time'>
                         2022-10-11
                    </div>
               </div>
               <div className='post_content'>
                    <h4>hello</h4>
                    <p>hello_world</p>
               </div>
          </div>
    </div>
  )
}

