import '../CSS-files/Contact.css';
import { FormattedMessage } from 'react-intl';

const Contact = () => {
    
    return(
        <div className="C-main">
            <h2><FormattedMessage id="C-header"/> </h2>
            <div className="C-first">
                <div className="C-member">
                    <img src="members/gwen.png" alt="Gwen"></img>
                    <div>
                        <h1>Gwen Ancel</h1>
                        <p><FormattedMessage id="C-mail"/>: g.ancel@uniandes.edu.co</p>
                    </div> 
                </div>
                <div className="C-member">
                    <img src="members/isabela.png" alt="Isabela"></img>
                    <div>
                        <h1>Isabela Martínez</h1>
                        <p><FormattedMessage id="C-mail"/>: l.martinezg@uniandes.edu.co</p>
                    </div> 
                </div>
            </div>
            <div className="C-second">
                <div className="C-member">
                    <img src="members/laura.png" alt="Laura"></img>
                    <div>
                        <h1>Laura Restrepo - <FormattedMessage id="C-leader"/></h1>
                        <p><FormattedMessage id="C-mail"/>: l.restrepop@uniandes.edu.co</p>
                    </div> 
                </div>
                <div className="C-member">
                    <img src="members/alejandro.png" alt="Alejandro"></img> 
                    <div>
                        <h1>Alejandro Tovar</h1>
                        <p><FormattedMessage id="C-mail"/>: da.tovar10@uniandes.edu.co</p>
                    </div>     
                </div>                
            </div>
        </div>
    )
}

export default Contact;