import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LauchSession from "../components/Blog/Session/LauchSession";
import axios from "axios";

const LaunchSession = () => {
  let getToken = localStorage.getItem("token");

  const headers = {
    Authorization: `Token ${getToken}`,
    "Content-Type": "application/json",
  };
  // ===================================================================
  let userData= JSON.parse(localStorage.getItem('user'))// {}

  // validate date in future method
  const isDateInFuture = (dateString) => {
    const currentDate = new Date();
    const selectedDate = new Date(dateString);
    console.log("is vali", selectedDate.getTime() > currentDate.getTime());
    return selectedDate.getTime() > currentDate.getTime();
  }

  useEffect(() => {
  
  }, []);

  const history = useHistory();
  const [showPortal, setShowPortal] = useState(false);
  const handlePotalClose = () => {
    setShowPortal(false);
  };
  const [errorMsg, seterrorMsg] = useState("");

  const [sessionData, setSessionData] = useState({
    //sessionId: 0,
    mentor: 0,
    sessionTitle: "",
    sessionAvaileDate: [],
    end_date: "",
    tags: [],
  });

  const [sessionDataError, setsessionDataError] = useState({
    //sessionId: 0,
    exceeds_end_date:"",
    mentorError: "",
    sessionTitleError: "",
    sessionAvaileDateError: "",
    session_deruration_Error: "",
    price_Error:'',
    end_dateError: "",
    tagsError: [],
    session_all_AvaileDateError : ''
  });
  
  // that hold vals of one session detail
  const [tmpSessionDate, settmpSessionDate] = useState({
    session_date: "",
    deruration: "",
    reserved: false,
    id: 0,
    price: 0.0,
  });
  const [tags, setTagsLst] = useState([]);
  const [end_dateValue, setDateValue] = useState("");

  const chnageSessionData = (e) => {
    // handle title input
    if (e.target.name == "title") {
      setSessionData({
        ...sessionData,
        sessionTitle: e.target.value,
      });
      setsessionDataError({
        ...sessionDataError,
        sessionTitleError:""
      })
    }
    // handle end date input
    if (e.target.name == "end_date") {
      setsessionDataError({
        ...sessionDataError,
        end_dateError:""
      })
      setDateValue(e.target.value);
      let end_date = e.target.value;
      console.log("future----------------", end_dateValue);
      setSessionData({
        ...sessionData,
        end_date: e.target.value,
      });
      if (isDateInFuture(end_date)) {
        setsessionDataError({
          ...sessionDataError,
          end_dateError: ""
        })

      } else {
        setsessionDataError({
          ...sessionDataError,
          end_dateError: "End date can't be in the past"
        })
        seterrorMsg("End date can't be in the past");
        setShowPortal(true);
      }
    }
    if (e.target.name == "date") {
      setsessionDataError({
        ...sessionDataError,
        session_deruration_Error:"",
        sessionAvaileDateError:""
      })
      settmpSessionDate({
        ...tmpSessionDate,
        session_date: e.target.value,
      });
    }
    if (e.target.name == "deruration") {
      settmpSessionDate({
        ...tmpSessionDate,
        deruration: e.target.value,
      });
      console.log('ppppppppp' , tmpSessionDate)

    }
    if (e.target.name == "price") {
      setsessionDataError({
        ...sessionDataError, 
        price_Error:""
      })
      settmpSessionDate({
        ...tmpSessionDate,
        price: e.target.value,
      });
  }
  };

  const addSession = (e) => {
    // on click in add buton -> append date obj to `sessionAvaileDate`
    // work on ->  setSessionData settmpSessionDate sessionAvaileDate
    // handel index of current session date -> session subid
    /* steps 
        1- validate 
            1- handel index
            2- append to sessionData -> if valid 
            3- clear input values -> clear start asln :)"
        */

    e.preventDefault();
    const dateformat =
      /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

    // const isValidDate = dateformat.match(tmpSessionDate.date);

    // valid data
    // console.log(
    //   "-----------------------------",isNaN(tmpSessionDate.session_date.toString()));
    setsessionDataError({
      ...sessionDataError, 
      session_deruration_Error : "",
      sessionAvaileDateError : "",
      price_Error:""
    })
    console.log('------------' , tmpSessionDate);
    if (tmpSessionDate.session_date && tmpSessionDate.deruration){ // validate both data exits
      if (isDateInFuture(tmpSessionDate.session_date)){ //happy scenario
        setsessionDataError({
          ...sessionDataError,
          price_Error: tmpSessionDate.price? '': "session defualt price would be 9.99$"
        })
     
        console.log('kkkkkkk' , tmpSessionDate)
        setSessionData((prev) => {
            return {
              ...prev,
              sessionAvaileDate: [
                ...prev.sessionAvaileDate,
                { ...tmpSessionDate, id: Date.now().toString() },
              ],
            };
          });
          console.log('rowia' ,'test', tmpSessionDate.price)

         
        // clear state
        settmpSessionDate({
          id: 0,
          session_date: "",
          deruration: "",
          reserved: false,
          price:0

        });
      
      }else{ // session date in past
        seterrorMsg("session date can't be in the past");
        setsessionDataError({
          ...sessionDataError,
          session_deruration_Error : !tmpSessionDate.deruration ? "session deruartion is required" :"",

          sessionAvaileDateError: "Session date can't be in the past"
        })
        console.log(errorMsg);
        setShowPortal(true);
      }

    }else{// missing out data
      console.log('------------' , tmpSessionDate)
      const errorMsg = !tmpSessionDate.session_date? "session date is required" : "session deruration is required";
      seterrorMsg(errorMsg);
      setShowPortal(true);
      setsessionDataError({
        ...sessionDataError, 
        session_deruration_Error : !tmpSessionDate.deruration ? "session deruartion is required" :"",
        sessionAvaileDateError : !tmpSessionDate.session_date ? "session date is required" : ""
      })
    }
  };

  const removeSessionDate = (id) => {
    //const removedSessionData = sessionData.sessionAvaileDate[index];
    const filteredData = sessionData.sessionAvaileDate.filter((date) => {
      return date.id != id;
    });
    setSessionData({
      ...sessionData,
      sessionAvaileDate: filteredData, //[...filteredData]
    });
  };

  const validate_data = () => {
    // console.log(
    //   "dates",
    //   sessionData.sessionAvaileDate,
    //   sessionData.sessionAvaileDate.length
    // );
    //{condition1 ? result1 : condition2 ? result2 : result3}
    let errorMsg = !sessionData.sessionTitle
      ? "Session Title is required"
      : !sessionData.sessionAvaileDate.length
      ? "Session availabe date is required"
      : "";
    console.log('llllllllllllll' , sessionData , errorMsg)
    if (errorMsg) {
        seterrorMsg(errorMsg);
        setShowPortal(true);
        // error msg text 
        setsessionDataError({
          ...sessionDataError,
          sessionTitleError: !sessionData.sessionTitle? "Session Title is requird !" : "",
          session_all_AvaileDateError: !sessionData.sessionAvaileDate.length? "Session availabe date is required" : ""
        })
       return false;
    }
    if (!sessionData.end_date) {
      seterrorMsg("end date can't be in the past");
      setShowPortal(true);
      return false;
    }
    // if(!sessionData.available_dates.length){
    //   setsessionDataError({
    //     ...sessionDataError,
    //     sessionTitleError: !sessionData.sessionTitle? "Session Title is requird !" : "",
    //     session_all_AvaileDateError: !sessionData.sessionAvaileDate.length? "Session availabe date is required" : ""
    //   })
    // }
    setsessionDataError({}); //clear error msg
    return true;
  };

  const create_new_session = async () => {
    
    const data = {
      title: sessionData.sessionTitle,
      available_dates: sessionData.sessionAvaileDate,
      mentor: userData.user_id, //userData.user_id,
      tags: tags,
    };

    if (sessionData.end_date){
      data['ended_at'] = sessionData.end_date
    }
    if(validate_data){
    try {
      console.log("------------data", data);
      const response = await axios.post(
        `http://127.0.0.1:8000/roomsession/`,
        data,
        { headers }
      );
      console.log("rowida ----------------------------", response);

      history.push(`/mentorProfile/${userData.user_id}`);
    } catch (error) {
      console.error("-------------------------------rowida error", error );
      setsessionDataError({
        sessionTitleError: error.response.data["title"] ? "title is required" : "",
        session_all_AvaileDateError: error.response.data["available_dates"] ? "available_dates is required" : "",
        end_dateError: error.response.data["ended_at"] ? error.response.data["ended_at"] : "",
        exceeds_end_date:error.response.data["exceeds_end_date"] ? error.response.data['exceeds_end_date'] : ""
      })

    }}
  };
  // add new session ->  in local stoagre
  const onSubmitSession = (e) => {
    // create session ->  in local stoagre
    e.preventDefault();

    // if (validate_data()) {
    //   console.log("dataaaaaaaaaaaaa", sessionData.sessionTitle);
    //   console.log("dataaaaaaaaaaaaa tags", tags);
      console.log("token on submit", getToken);
      create_new_session();
    // }

    //   const sessions = createSession();
    //   const numberOfSession = sessions.length + 1;
    //   console.log("numberrrrrrrrrr", numberOfSession)
    //
    //   setSessionData((prev) => {
    //     return {
    //       ...prev,
    //       sessionId: sessions.length + 1,
    //     };
    //   })

    // sessions.push(sessionData);
    // localStorage.setItem("sessions", JSON.stringify(sessions));
  };

  return (


  <LauchSession
      onSubmitSession={onSubmitSession}
      sessionData={sessionData}
      setSessionData={sessionData}
      chnageSessionData={chnageSessionData}
      addSession={addSession}
      removeSessionDate={removeSessionDate}
      tmpSessionDate={tmpSessionDate}
      showPortal={showPortal}
      handlePotalClose={handlePotalClose}
      setShowPortal={setShowPortal}
      errorMsg={errorMsg}
      tags={tags}
      end_dateValue={end_dateValue}
      setTagsLst={setTagsLst}
      sessionDataError={sessionDataError}
    />

  );
};

export default LaunchSession;
