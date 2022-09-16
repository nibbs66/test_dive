import React from 'react';
import styles from "../../styles/admin/Person.module.css";
import Edit from "../icons/Edit";
import Check from "../icons/Check";
import dayjs from "dayjs";

const Accordion = ({handleClick, section, setEditInput, editInput, user, option, handleEdit}) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infoTitle}  onClick={(e)=>handleClick('Personal')}>
                <span>Personal</span>
                <div className={styles.iconContainer}>
                    {section !== 'Personal' ? '+' : '-'}
                </div>
            </div>
            <div className={section === 'Personal' ? styles.infoActive : styles.info}>

                <div className={styles.containerItem}>
                    <div>
                                    <span className={styles.span}>
                                        <b>Username:</b>
                                    </span>
                        <span className={styles.span}>{user.personal.username}
                            </span>
                    </div>
                    <span onClick={()=>setEditInput('username')}><Edit/></span>
                </div>
                <div  className={editInput === 'username' ? styles.live : styles.notLive}>
                    <span className={styles.span}><input  type="text" placeholder='new username...'/></span><span className={styles.check}><Check/></span>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.containerItem}>
                    <div>
                        <span className={styles.span}><b>Street:</b></span>
                        <span className={styles.span}>  {user.address.address}</span>
                    </div>
                    <span onClick={()=>setEditInput('address')}><Edit/></span>
                </div>
                <div  className={editInput === 'address' ? styles.live : styles.notLive}>
                    <span className={styles.span}><input  type="text" placeholder='new address...'/></span><span className={styles.check}><Check/></span>
                </div>
                <hr className={styles.hr}/>
                <div className={styles.containerItem}>
                    <div>
                            <span className={styles.span}>
                                <b>Address:</b> </span>
                        <span className={styles.span}>{user.address.city} {user.address.postalCode}
                                </span>
                    </div>
                    <span onClick={()=>setEditInput('city')}><Edit/></span>
                </div>
                <div  className={editInput === 'city' ? styles.live : styles.notLive}>
                    <span className={styles.span}><input  type="text" placeholder='new city...'/></span><span className={styles.check}><Check/></span>
                    <span className={styles.span}><input  type="text" placeholder='new postal code...'/></span><span className={styles.check}><Check/></span>
                </div>
                <hr className={styles.hr}/>
                <span className={styles.span}>
                                <b>Country:</b> {user.address.country}
                                </span>

                <span className={styles.span}>
                                <b>Email:</b> {user.personal.email}
                                </span>
                <span className={styles.span}>
                                <b>Phone:</b> {user.personal.phone}
                                </span>
                <span className={styles.span}>
                                <b>Birthday:</b> {dayjs(user.personal.dob).format('DD MMM YYYY')}
                                </span>
                <span className={styles.span}>
                                <button className={styles.editButton} onClick={handleEdit}>Edit</button>
                            </span>
            </div>
        </div>
    );
};

export default Accordion;
