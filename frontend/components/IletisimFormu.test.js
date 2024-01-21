import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';


//bütün testlerde ilk işlem render olduğu için hepsinde ilk önce geçerli olacak testi yazıyoruz: 
beforeEach(() => {
    render(<IletisimFormu />);
});


test('hata olmadan render ediliyor', () => {
//şu an render'a ihtiyacımız yok. beforeEach render'ı burası için de geçerli
});

test('iletişim formu headerı render ediliyor', () => {
    const header = screen.getByText(/İletişim Formu/i);
    expect(header).toBeInTheDocument();
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "a");
    screen.getByText("Hata: ad en az 5 karakter olmalıdır.")
    //şöyle de yapabilirdik: screen.getByTestId("ad-error");
    //queryBy kullanmaya gerek olmadığı için expect kullanmaya gerek yok. 
});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit); //fireEvent'ten click eventini aldık ve submiti parametre verdik.
    screen.getByTestId("ad-error");
    screen.getByTestId("soyad-error");
    screen.getByTestId("email-error");


});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Ezgiş");
    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "Sezgi");
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit); 
});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "ezgisezgi");
    screen.getByText("Hata: email geçerli bir email adresi olmalıdır.");

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Ezgiş");
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "ezgi@sezgi.com");
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);
    screen.getByTestId("soyad-error");

});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Ezgiş");
    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "Sezgi");  
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "ezgi@sezgi.com");
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);
    // bu üç inputta hata mesajı olmadığını anlamak için queryByTestId kullanacağız: 
    const adError = screen.queryByTestId("ad-error");
    const soyadError = screen.queryByTestId("soyad-error");
    const emailError = screen.queryByTestId("email-error");

    expect(adError).toBeNull();
    expect(soyadError).toBeNull();
    expect(emailError).toBeNull();


});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "Ezgiş");
    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "Sezgi");  
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput, "ezgi@sezgi.com");
    const mesajInput = screen.getByTestId("mesaj-input");
    userEvent.type(mesajInput, "Merhaba");
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    //her şeyi gönderince, tüm inputların göründüğü, "goruntule-div" testid'si verdiğimiz div görünüyor mu, ona bakıyoruz: 

    const goruntuleDiv = screen.getByTestId("goruntule-div");
    expect(goruntuleDiv).toBeInTheDocument();

});


//not: getByText yerine, ekranda o anda olma ihtimali olan ya da olmayan (toggle ya da conditional rendering) bir kod olsaydı, queryByText kullanırdık. 


