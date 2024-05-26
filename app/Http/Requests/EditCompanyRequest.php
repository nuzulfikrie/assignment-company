<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EditCompanyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    //prepare for validation
    protected function prepareForValidation()
    {
        $this->merge([
            'email' => $this->email ?? null,
            'website' => $this->website ?? null,
        ]);

        if ($this->hasFile('logo')) {
            $this->merge([
                'logo' => $this->file('logo'),
            ]);
        } else {
            $this->merge([
                'logo' => null,
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => 'required',
            'email' => 'nullable|email',
            'logo' => 'nullable|image|dimensions:min_width=100,min_height=100',
            'website' => 'nullable|url',
        ];
    }
}
