import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from './../../Layouts/AppLayout';
import { TextInput, Label, FileInput } from 'flowbite-react';

interface FormData {
  name: string;
  email: string;
  logo: FileList;
  website: string;
}

interface Props {
  company: {
    id: number;
    name: string;
    email: string;
    logo: string;
    website: string;
  };
}

const Edit: React.FC<Props> = ({ company }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: {
      name: company.name,
      email: company.email,
      website: company.website
    }
  });

  useEffect(() => {
    reset(company);
  }, [company, reset]);

  const onSubmit = (data: FormData) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('website', data.website);
    if (data.logo && data.logo.length > 0) {
      formData.append('logo', data.logo[0]);
    }

    Inertia.post(`/companies/${company.id}`, formData);
  };

  return (
    <AppLayout
      title="Edit Company"
      renderHeader={() => <h2>Edit Company</h2>}
    >
      <h1 className="text-2xl font-bold mb-4">Edit Company</h1>
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
          {company.logo && (
            <div className="mb-2">
              <img src={`/storage/${company.logo}`} alt="Company Logo" className="h-20 w-20 object-contain" />
            </div>
          )}
          <input
            id="logo"
            type="file"
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
          <button type="button" className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-md" onClick={() => reset(company)}>Reset</button>
        </div>
      </form>
    </AppLayout>
  );
};

export default Edit;
