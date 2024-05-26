<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditCompanyRequest;
use App\Models\Company;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $companies = Company::when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%");
        })->paginate(10)->withQueryString();

        return inertia('Companies/Index', [
            'companies' => $companies,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return inertia('Companies/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'nullable|email',
            'logo' => 'nullable|image|dimensions:min_width=100,min_height=100',
            'website' => 'nullable|url',
        ]);

        $data = $request->all();

        if ($request->hasFile('logo') && $request->file('logo') != null) {
            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        Company::create($data);
        return redirect()->route('companies.index')->with('success', 'Company created successfully.');
    }

    public function show(Company $company)
    {
        return inertia('Companies/Show', compact('company'));
    }

    public function edit(Company $company)
    {
        return inertia('Companies/Edit', compact('company'));
    }

    public function update(EditCompanyRequest $request, Company $company)
    {

        try {
            $data = $request->validated();

            if ($request->hasFile('logo') && $request->file('logo') != null) {
                if ($company->logo) {
                    Storage::disk('public')->delete($company->logo);
                }
                $data['logo'] = $request->file('logo')->store('logos', 'public');
            } else {
                $data['logo'] = $company->logo;
            }

            $company->update($data);
            return redirect()->route('companies.index')->with('success', 'Company updated successfully.');
        } catch (Exception $e) {
            Log::info('--- Error in CompanyController@update --- ' . $e->getMessage() . ' --- ' . $e->getLine() . ' --- ' . $e->getFile());
            //throw $th;
        }
    }

    public function destroy(Company $company)
    {
        if ($company->logo) {
            Storage::disk('public')->delete($company->logo);
        }
        $company->delete();
        return redirect()->route('companies.index')->with('success', 'Company deleted successfully.');
    }

    public function count()
    {
        $count = Company::count();
        return response()->json(['count' => $count]);
    }

}
