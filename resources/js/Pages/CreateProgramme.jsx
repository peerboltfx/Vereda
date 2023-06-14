import React, {useState} from "react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState } from 'draft-js';
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "../../css/main.css";


export default function CreateProgramme(props){
    const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());

    const [convertedContent, setConvertedContent]=useState(null);
    const HandleEditorChange= (state)=>{
        setEditorState(state);
    }

    const convertContentToHTML = () =>{
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    const createMarkup = (html) =>{
        return {
            __html: DOMPurify.sanitize(html)
        }
    }
    return(
        <AuthenticatedLayout
        auth={props.auth}
        errors={props.errors}
        header={<>
            <h2 className="font-semibold ts-1 leading-tight">Moderator</h2>
            <h3 className="fs-4 text-color-blue">Upload Course </h3>
        </>}      >
        <Head title="Create / Programme" />


        <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <Editor 
                            editorState={editorState}
                            onEditorStateChange={HandleEditorChange}
                            toolbarClassName="toolbar-class"
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            />
                            <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
                            </div>
                    </div>
                </div>
            </div>
</AuthenticatedLayout>
    )
}