import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllFields } from "../features/linksSlice";
import { selectAllUsers, useGetUsersQuery } from "../features/users/usersApiSlice";
import { useAddNewLinkMutation, useUpdateLinkMutation, useDeleteLinkMutation, useGetLinksQuery } from "../features/links/linksApiSlice";
import { addField, removeField, setSelectValue, setTextValue, dragEnd, updateFields } from "../features/linksSlice";
import { Link, useParams } from "react-router-dom";
import styles from '../css modules/addlink.module.css'
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../helpers/StrictModeDroppable";

const AddLink = () => {
    const fields= useSelector(selectAllFields)
    const dispatch= useDispatch()

    const { id }= useParams()


    const { data, isLoading: dataLoading } = useGetLinksQuery('linksList', {refetchOnMountOrArgChange:true, refetchOnFocus: true})
    const totalLinks= data?.entities
    //console.log(totalLinks)
    const finalArr = [];
    
    for (const key in totalLinks) {
      if (totalLinks.hasOwnProperty(key) && totalLinks[key].user === id) {
        const { selectValue, textValue, _id, index } = totalLinks[key];
        const objectLook = {
          selectValue: selectValue,
          textValue: textValue,
          id: _id,
          index: index
        };
        finalArr.push(objectLook);
      }
    }

    console.log(finalArr);
    
    
    useEffect(() => {
      if (finalArr.length > 0) {
        dispatch(updateFields(finalArr));
      }
    }, [dataLoading]);


    const [addNewLink, {
      isLoading,
      isError,
      isSuccess,
      error
    }]= useAddNewLinkMutation()

    const [updateLink, {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      isSuccess: isUpdateSuccess,
      error: updateError
    }]= useUpdateLinkMutation()

    const [deleteLink, {
      isError: isDelError,
      isSuccess: isDelSuccess,
      error: delError
    }]= useDeleteLinkMutation()

    const handleLinkSaved= async(e) => {
      e.preventDefault()
      fields.forEach(async(field, index) => {
        const{ selectValue, textValue, id: linkId }= field
        if (finalArr.length > 0) {
          const response= await updateLink({ id: linkId, user: id, selectValue, textValue, index })
          console.log(response.data)
        }
        const response= await addNewLink({ user: id, selectValue, textValue, index })
        console.log(response.data)
        console.log(index)
      })
    }


    /* const handleUpdateLinks = async (e) => {
      try {
        // Remove existing links from the database
        await updateLink({ user: id, fields: [] });
    
        // Add new links to the database
        e.preventDefault();
        
        const updatePromises = fields.map(async (field, index) => {
          const { selectValue, textValue } = field;
          const newLinks = [
            { selectValue },
            { textValue },
            { index }
          ];
          return updateLink({ user: id, links: newLinks, index });
        });
    
        await Promise.all(updatePromises);
        
        console.log('Links updated successfully!');
      } catch (error) {
        console.error('Error updating links:', error);
      }
    };
    
 */

  
    const handleAddField = () => {
      dispatch(addField())
    };
  
    const handleRemoveField = (index) => {
      dispatch(removeField(index))
    };
  
    const handleSelectChange = (index, value) => {
      dispatch(setSelectValue({index, selectValue:value}))
    };
  
    const handleTextChange = (index, value) => {
      dispatch(setTextValue({index, textValue:value}))
    };
  
    const handleSubmit = () => {
      // You can submit the values here
      alert(JSON.stringify(fields));
    };

    const handleOnDrageEnd= (result)=> {
     dispatch(dragEnd(result))
    }

    const handleRemoveAndUpdate = (index) => {
      fields.map((field, index) => {
        const { selectValue, textValue, id } = field;
        deleteLink({ id })
      })
      handleRemoveField(index);
    };

     
    

    if (dataLoading && !finalArr.length)return <p>Loading...</p>

    const content= (
      <form action="" onSubmit={handleLinkSaved} className={styles.addlinkdiv}>
      {isSuccess? <p>created</p>: null}
      {isError? <p>{error?.data?.message}</p>: null}
      {isLoading? <p>Loading...</p>: null}
      <button className={styles.addlinkbtn} type="button" onClick={handleAddField}>+ Add new link</button>
      <DragDropContext onDragEnd={handleOnDrageEnd}>
        <Droppable droppableId="addlinks">
          {(provided)=> (
            <section  {...provided.droppableProps} ref={provided.innerRef}>
      {fields.map((field, index) => (   //start 
      <Draggable key={index} draggableId={index.toString()} index={index}>
        {(provided)=> (
        <form key={index} className={styles.linkfield} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className={styles.topindex}>
              <p className={styles.linkindex}>Link #{index+1}</p>
          <Link className={styles.removebtn}  onClick={handleRemoveAndUpdate}>Remove</Link>
          </div>
          <label htmlFor="">Platform</label>
          <select
            value={field.selectValue}
            onChange={(e) => handleSelectChange(index, e.target.value)}
          >
            <option  >select option</option>
            <option className={styles.option1} value="Github">Github</option>
            <option value="Frontendmentor">Frontend Mentor</option>
            <option value="Twitter">Twitter </option>
            <option value="Linkedin">LinkedIn</option>
            <option value="Youtube">Youtube</option>
            <option value="Facebook">Facebook</option>
            <option value="Twitch">Twitch</option>
            <option value="Devto">Dev.to</option>
          </select>
          <label htmlFor="">Link</label>
          <input
            type="text"
            value={field.textValue}
            placeholder={
              field.selectValue=== 'Twitch'? 'https://www.twitch.com/vokecordz':
              field.selectValue=== 'Devto'? 'https://www.devto.com/vokecordz':
              field.selectValue=== 'Youtube'? 'https://www.youtube.com/vokecordz':
              field.selectValue=== 'Frontendmentor'? 'https://www.frontendmentor.com/vokecordz':
              field.selectValue=== 'Github'? 'https://www.github.com/vokecordz':
              field.selectValue=== 'Twitter'? 'https://www.twitter.com/vokecordz':
              field.selectValue=== 'Linkedin'? 'lhttps://www.linkedin.com/vokecordz':
              field.selectValue=== 'Facebook'? 'https://www.facebook.com/vokecordz':''
            }
            onChange={(e) => handleTextChange(index, e.target.value)}
          />
        </form>
        )}
        </Draggable>
      ))}
      {provided.placeholder}
      </section>
          )}
          </Droppable>
      </DragDropContext>
      
      <button type="submit" className={styles.savebtn}>Save</button>
    </form>
    )
    return content
  };
  
  export default AddLink;