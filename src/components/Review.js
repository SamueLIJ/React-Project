import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
// import LoadingSvg from "../LoadingSvg";
import styled from "styled-components";
import CircleLoaderComponent from "./Loadingpage";
import {Button as Buttonbootstrap, Modal} from "react-bootstrap"


  const GetMessage = gql`
  query MyQuery {
    review {
      id
      message
      username
    }
  }
  
  `;

  const DeleteMessage = gql`
  mutation MyMutation($id: Int!) {
    delete_review_by_pk(id: $id) {
      id
      username
      message
    }
  }
  
  `;

  // mutation MyMutation2($id: Int!, $message: String = "") {

  const UpdateMessage = gql`
  mutation MyMutation($id: Int!, $message: String!) {
    update_review_by_pk(
      pk_columns: { id: $id }
      _set: { message: $message }
    ) {
      id
      message
      username
    }
  }
  `;

  const InsertMessage = gql`
  mutation MyMutation($message: String, $username: String) {
    insert_review_one(object: {message: $message, username: $username}) {
      message
      username
    }
  }
  
  `;
  
  function ReviewPage(){
    // const {id, username, message} = props.data
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const
  const [username, setUsername] = useState("")
  const [message, setMessage] = useState("")
  const [update,setUpdate] = useState([])
  const {loading,error,data,refetch} = useQuery(GetMessage, {
    variables:{_eq:{}},
    notifyOnNetworkStatusChange:true,
  })

  const [insertMessage, { loading: loadingInsert }] = useMutation(
    InsertMessage,
    {
      refetchQueries: [GetMessage],
    }
  );

  const [deleteMessage , {loading:loadingDelete}] = useMutation(
    DeleteMessage,
    {
      refetchQueries:[GetMessage],
    }
  )

  const [updateMessage, {loading:loadingUpdate}] = useMutation(
    UpdateMessage,
    {
      refetchQueries:[GetMessage],
    }
  )



  // const [updateMessage, { loading: loadingUpdate }] = useMutation(
  //   UpdateMessage,
  //   {
  //     refetchQueries: [GetMessage],
  //   }
  // 

 

  // if (loading || loadingUpdate || loadingDelete || loadingInsert){
  //   return <CircleLoaderComponent />
  //  }

  if (loading || loadingInsert || loadingDelete){
    return <CircleLoaderComponent />
   }

  const handleInputUsername = (e) => {
    setUsername(e.target.value)
    };

    const handleInputMessage = (e) => {
      setMessage(e.target.value)
      };
  
      const handleSubmitInsert = ()=>{
        insertMessage({
          variables:{
            message:message,
            username:username
          }
        })
      }

    const handleDelete = (e) =>{
      deleteMessage({
        variables:{
          id:parseInt(e.target.id),
        }
      })
    }

    const handleSubmitUpdate = (e) =>{
      const id = parseInt(e.target.id)
      const isFound = update.find(list=>list.id===id)
      updateMessage({
        variables:{
          id:parseInt(e.target.id),
          message:isFound.message
        }
      })
      setShow(false)
    }

    const handleUpdateForm = (e) =>{
      const id = parseInt(e.target.id)
      const message = e.target.value
      const isFound = update.find(list=>list.id===id)
        if (isFound){
         const newUpdate= update.map(item=>{
            if(item.id===id){
              item.message=message
            }
            return item
          })
          setUpdate(newUpdate)
        }
          else{
          setUpdate([...update,{
            id:id,
            message:message,
          }])

        }
        // console.log(update)
        // alert(id)
      }

      // function Example(props) {
      //   return (
      //     <>
      //       <Modal show={props.show} onHide={props.handleClose}>
      //         <Modal.Header closeButton>
      //           <Modal.Title>Modal heading</Modal.Title>
      //         </Modal.Header>
      //         <Modal.Body>
      //           <form onSubmit={props.submit}><input placeholder="Update Message" onChange={(e)=>{props.setMessage(e.target.value)}} value={props.value}></input>
                
      //           <buttonbootstrap variant="secondary" onClick={props.handleClose}>
      //             Close
      //           </buttonbootstrap>
      //           <buttonbootstrap variant="primary" type="submit">
      //             Save Changes
      //           </buttonbootstrap>
      //           </form>
      //           </Modal.Body>
      //       </Modal>
      //     </>
      //   );
      // }

      // function Example(props) {
      //   return (
      //     <Modal
      //       {...props}
      //       //   size="sm"
      //       aria-labelledby="contained-modal-title-vcenter"
      //       centered
      //     >
      //       <Modal.Header closeButton>
      //         <Modal.Title id="contained-modal-title-vcenter">
      //           Change your name
      //         </Modal.Title>
      //       </Modal.Header>
      //       <Modal.Body>
      //       <form onSubmit={props.submit}><input placeholder="Update Message" onChange={(e)=>{props.setMessage(e.target.value)}} value={props.value}></input>
                
      //                      {/* <buttonbootstrap variant="secondary" onClick={props.handleClose}>
      //                        Close
      //                      </buttonbootstrap> */}
      //                      <Button variant="primary" type="submit" onClick={props.submit}>
      //                        Save Changes
      //                      </Button>
      //                      </form>
      //       </Modal.Body>
      //     </Modal>
      //   );
      // }
  // console.log(username);
  return (
    <Wrapper>
    <br/>
     <h3> Reviews</h3> 
      <br/><Button color="success" variant="contained" className="btn" onClick={handleSubmitInsert}> Add Review</Button> &nbsp;
      <input placeholder="Fill Username" onChange={handleInputUsername}></input>&nbsp;
      <input placeholder="Fill Message" onChange={handleInputMessage}></input>

      
      <table>
        <tbody>
          {data.review.map(item =>
          <>
          <br/>
          <tr>
            <td>Username: <span className="front">{item.username}</span></td>
          </tr>
          <tr>
            <td>Message:  <span className="front">{item.message}  <input placeholder="Update Message" onChange={handleUpdateForm} id={item.id}></input>
                  <Button color="secondary"  onClick={handleSubmitUpdate} id={item.id}>Submit</Button> </span></td>
           
            &nbsp; <Button variant="outlined" id={item.id} onClick={()=>{setShow(true) ; setMessage(item.message)}}>Edit </Button><br/>
                    {/* <Example show={show} handleClose={()=>setShow(false)} setMessage={setMessage} value={message} submit={()=>handleSubmitUpdate(item.id)} /> */}

            &nbsp; <Button variant="outlined" color="error" onClick={handleDelete} id={item.id}>Delete</Button>
            </tr><br/>
            <hr/>
            </>
          )

          }
        </tbody>
      </table>
    </Wrapper>
  )
}

const Wrapper = styled.section`

color:black;

.front{
  font-size:medium;
  color:#978460;
  font-weight:bold;
  display: inline-block;
  text-transform: capitalize;
}
`







export default ReviewPage;
