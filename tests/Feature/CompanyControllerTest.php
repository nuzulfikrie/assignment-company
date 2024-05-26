<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage; // Add this line
use Pest\Laravel\{actingAs, get, post, put, delete};

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it('can create a company', function () {
    $user = User::factory()->create();
    Storage::fake('public');

    $file = UploadedFile::fake()->image('logo.jpg', 120, 120);

    $response = actingAs($user)->post('/companies', [
        'name' => 'Test Company',
        'email' => 'test@example.com',
        'logo' => $file,
        'website' => 'https://example.com',
    ]);

    $response->assertRedirect('/companies');
    $response->assertSessionHas('success', 'Company created successfully.');

    $this->assertDatabaseHas('companies', [
        'name' => 'Test Company',
        'email' => 'test@example.com',
        'website' => 'https://example.com',
    ]);

    Storage::disk('public')->assertExists('logos/' . $file->hashName());
});

it('can update a company', function () {
    $user = User::factory()->create();
    $company = Company::factory()->create();
    Storage::fake('public');

    $file = UploadedFile::fake()->image('new_logo.jpg', 120, 120);

    $response = actingAs($user)->put("/companies/{$company->id}", [
        'name' => 'Updated Company',
        'email' => 'updated@example.com',
        'logo' => $file,
        'website' => 'https://updated.com',
    ]);

    $response->assertRedirect('/companies');
    $response->assertSessionHas('success', 'Company updated successfully.');

    $this->assertDatabaseHas('companies', [
        'id' => $company->id,
        'name' => 'Updated Company',
        'email' => 'updated@example.com',
        'website' => 'https://updated.com',
    ]);

    Storage::disk('public')->assertExists('logos/' . $file->hashName());
});

it('can delete a company', function () {
    $user = User::factory()->create();
    $company = Company::factory()->create();
    Storage::fake('public');

    $response = actingAs($user)->delete("/companies/{$company->id}");

    $response->assertRedirect('/companies');
    $response->assertSessionHas('success', 'Company deleted successfully.');

    $this->assertDatabaseMissing('companies', [
        'id' => $company->id,
    ]);
});
