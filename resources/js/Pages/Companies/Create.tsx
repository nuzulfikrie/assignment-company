import React from 'react';
import { useForm } from 'react-hook-form';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from './../../Layouts/AppLayout';
import { TextInput, Label, Button, FileInput } from 'flowbite-react';

interface FormData {
    name: string;
    email: string;
    logo: FileList;
    website: string;
}

const Create: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (data.logo && data.logo[0]) {
            formData.append('logo', data.logo[0]);
        }
        formData.append('website', data.website);

        Inertia.post('/companies', formData);
    };

    return (
        <AppLayout
            title="Create Company"
            renderHeader={() => <h2>Create Company</h2>}
        >
            <h1 className="text-2xl font-bold mb-4">Create Company</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Label htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        placeholder="Enter company name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <Label htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        placeholder="Enter company email"
                        {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } })}
                    />
                    {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <Label htmlFor="logo" value="Logo" />
                    <FileInput
                        id="logo"
                        accept="image/*"
                        {...register('logo')}
                    />
                    {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
                </div>
                <div className="mb-4">
                    <Label htmlFor="website" value="Website" />
                    <TextInput
                        id="website"
                        type="url"
                        placeholder="Enter company website"
                        {...register('website', { pattern: { value: /^(https?:\/\/)?(([\w\d-]+)\.)*([\w\d-]+)(\.[a-zA-Z]{2,})([\/\w\d-]*)*\/?$/, message: 'Invalid website URL' } })}
                        />
                    {errors.website && <p className="text-red-500">{errors.website.message}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
          <button type="submit" className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md">Save</button>
          <button type="button" className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md" onClick={() => reset()}>Reset</button>
        </div>
            </form>
        </AppLayout>
    );
};

export default Create;
