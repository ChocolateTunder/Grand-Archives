import React from 'react';
import {Link} from 'react-router-dom';

const Navbar=()=>{
    const styles = {
        navbar: {
            backgroundColor: 'rgb(83, 195, 255)',
            width: "100%",
            display: "flex",
            // padding: "1em"
        },
        buttons: {
            borderColor: 'white',
            borderStyle: 'solid',
            borderWidth: '1px',
            padding: '10px'
        }
    }

    return (    
        <nav style={styles.navbar}>
            <div style={styles.buttons}>
                <Link to="/">Home</Link>
            </div>
            <div style={styles.buttons}>
                <Link to="/ability">Abilities</Link>
            </div>
            <div style={styles.buttons}>
                <Link to="/power">Powers</Link>
            </div>
            <div style={styles.buttons}>
                <Link to="/feat">Feats</Link>
            </div>
            <div style={styles.buttons}>
                <Link to="/mastery">Masteries</Link>
            </div>
            <div style={styles.buttons}>
                <Link to="/trait">Traits</Link>
            </div>
        </nav>
    )
}

export default Navbar;