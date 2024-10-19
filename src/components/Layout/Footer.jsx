import React, { useEffect, useState } from 'react'
import { Instagram, Facebook, Pinterest, X } from '@mui/icons-material'

const Footer = () => {
  
    const [year, setYear] = useState(new Date().getUTCFullYear())

    useEffect(()=>{

        const getYear = () =>{
            setYear(new Date().getUTCFullYear())
        }

        getYear()
    }, [])

  return (
    <footer>
        <div className="upper-footer">
            <p>
            Stay up to date! We send out a newsletter twice a week with our latest news.
            </p>
            <form>
                <input type="email" name="email" id="email" placeholder='Email'/>
                <input type="submit" value="SUBSCRIBE" />
            </form>
        </div>
        <div className="middle-footer">
            <div>
                <h1 className="footer-title">Ecommerce</h1>
                <p className='footer-text'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est aspernatur nisi molestiae sapiente minus sunt cupiditate beatae sed maxime natus.
                </p>
            </div>
            <div>
                <h1 className="footer-title">Customer Service</h1>
                <ul className='footer-list-1'>
                    <li>Contact</li>
                    <li>FAQ</li>
                    <li>Returns</li>
                    <li>Policy</li>
                </ul>
            </div>
            <div>
                <h1 className="footer-title">Popular Categories</h1>
                <ul className='footer-list-1'>
                    <li>Furniture</li>
                    <li>Electronics</li>
                    <li>Lamps</li>
                    <li>Chairs</li>
                </ul>
            </div>
            <div>
                <h1 className="footer-title">Keep in touch!</h1>
                <ul className='footer-list-2'>
                    <li>
                        <X/>
                    </li>
                    <li> 
                        <Facebook/>
                    </li>
                    <li>
                        <Instagram/>
                    </li>
                    <li>
                        <Pinterest/>
                    </li>
                </ul>
            </div>
        </div>
        <div className="lower-footer">
            <p className="copyright">
                Copyright {year} &copy; All Rights Reserved.
            </p>
        </div>
    </footer>
  )
}

export default Footer