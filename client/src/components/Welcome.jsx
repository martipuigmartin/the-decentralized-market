import React, {useContext} from "react";

import {BsInfoCircle, SiEthereum} from 'react-icons/all';

import {LineChart, Loader} from './';
import {TransactionContext} from "../context/TransactionContext";
import {shortenAddress} from "../utils/shortenAddress";

/**
 * Devuelve inputs con las propiedades dadas.
 */
const Input = ({placeholder, name, type, value, handleChange}) => {
    return (<input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2  bg-transparent text-white border-none text-sm white-glassmorphism"
    />);
};

const Welcome = () => {
    /* Hooks. */
    const {
        connectWallet,
        currentAccount,
        formData,
        sendTransaction,
        handleChange,
        isLoading
    } = useContext(TransactionContext);

    /**
     * Si los campos addressTo, amount, keyword y message no están vacíos, envíe la transacción.
     */
    const handleSubmit = (e) => {
        const {addressTo, amount, keyword, message} = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) {
            return;
        }

        sendTransaction();
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div id="wallet" className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-20">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient">
                        Send ETH <br/> across the web
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Enter the crypto world. Buy and sell with ETH easily on tdm.
                    </p>
                    {/* Si no hay una cuenta corriente, mostrar el botón para conectar la billetera. */}
                    {!currentAccount && (
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            <p className="text-white text-base font-semibold"> Connect Wallet </p>
                        </button>
                    )}

                    <div className="p-5 mt-6 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <LineChart/>
                    </div>

                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div
                        className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full eth-card white-glassmorpism">
                        <div className=" flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div
                                    className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum className="text-white text-4xl"/>
                                </div>
                                <BsInfoCircle className="text-white"/>
                            </div>
                            <div>
                                {/* Si hay una cuenta corriente, acortará la dirección. Si no,
                                mostrará la palabra "Dirección". */}
                                <p className="text-white text-base font-rounded">
                                    {currentAccount ? shortenAddress(currentAccount) : 'Address'}
                                </p>
                                <p className="text-white text-lg font-semibold mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="p-5 mt-6 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Adress to" name="addressTo" type="text" handleChange={handleChange}/>
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange}/>
                        <Input placeholder="Keyword (GIF)" name="keyword" type="text" handleChange={handleChange}/>
                        <Input placeholder="Enter message" name="message" type="text" handleChange={handleChange}/>

                        <div className="h-[1px] w-full bg-gray-400 my-2"/>

                        {/* Si isLoading es verdadero, mostrará el componente Loader. Si no, mostrará
                        el botón. */}
                        {isLoading ? (<Loader/>) : (<button
                            type="button"
                            onClick={handleSubmit}
                            className="text-white w-full font-semibold mt-2 border-[1px] p-2  rounded-full cursor-pointer">
                            Send now
                        </button>)}

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Welcome;
