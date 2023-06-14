import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/inertia-react';



export default function Dashboard(props) {
    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {errorCode, errors, programs} = usePage().props;

    

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<>
                <h2 className="font-semibold ts-1 leading-tight">Error Page</h2>
                <h3 className="fs-4 text-color-blue"> {errorCode} </h3>
            </>}    >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                          
                          <h2 className='fs-6 p-5 text-color-gray'> {errors} <span></span></h2>
                               
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
