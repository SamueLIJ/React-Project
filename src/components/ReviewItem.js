import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import CircleLoaderComponent from "./Loadingpage";

const UpdateMessage = gql`
  mutation MyMutation($id: Int!, $message: String!) {
    update_review_by_pk(pk_columns: { id: $id }, _set: { message: $message }) {
      id
      message
      username
    }
  }
`;

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


export default function ReviewItem({item}){
    const [message, setMessage] = useState("");
    const [isUpdate, setIsupdate] = useState(false);
    const handleInputMessage = (e) => {
        setMessage(e.target.value);
      };

      const [updateMessage, { loading: loadingUpdate }] = useMutation(
        UpdateMessage,
        {
          refetchQueries: [GetMessage],
        }
      );

      const [deleteMessage, { loading: loadingDelete }] = useMutation(
        DeleteMessage,
        {
          refetchQueries: [GetMessage],
        }
      );

      const handleSubmitUpdate = (e) => {
        updateMessage({
          variables: {
            id: parseInt(e.target.id),
            message:message,
          },
        });
        // setShow(false);
      };

      const handleDelete = (e) => {
        deleteMessage({
          variables: {
            id: parseInt(e.target.id),
          },
        });
      };
      
      if (loadingUpdate || loadingDelete) {
        return <CircleLoaderComponent />;
      }
    return(
        <>
              <br />
              <tr>
                <td>
                  Username: <span className="front">{item.username}</span>
                </td>
              </tr>
              <tr>
                <td>
                  Message:{" "}
                  <span className="front">
                    {item.message}{" "}
                    {isUpdate && (   
                        <> <input
                      placeholder="Update Message"
                      onChange={handleInputMessage}
                      id={item.id}
                      value={message}
                    ></input>
                    <Button
                      color="secondary"
                      onClick={handleSubmitUpdate}
                      id={item.id}
                    >
                      Submit
                    </Button>{" "}
                    </>
                    )
                    }
                
                  </span>
                </td>
                &nbsp;{" "}
                <Button
                  variant="outlined"
                  id={item.id}
                  onClick={() => {
                    setMessage(item.message);
                    setIsupdate(true);
                  }}
                >
                  Edit{" "}
                </Button>
                <br /><br/>
                {/* <Example show={show} handleClose={()=>setShow(false)} setMessage={setMessage} value={message} submit={()=>handleSubmitUpdate(item.id)} /> */}
                &nbsp;{" "}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  id={item.id}
                >
                  Delete
                </Button>
              </tr>
              <br />
              <hr />
            </>
    )}