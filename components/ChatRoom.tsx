import React, { useCallback, useState, useRef, useEffect } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { useCookies } from "react-cookie"

type IUserData = {
    username: string;
    receivername: string;
    connected: boolean;
    message: string;
}

let stompClient: any = null;
const ChatRoom = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [privateChats, setPrivateChats] = useState<any>(new Map());
    const [publicChats, setPublicChats] = useState<any | any[]>([]);
    const [tab, setTab] = useState<string>("CHATROOM");
    const [connectError, setConnectError] = useState<boolean>(false);
    const [chatError, setChatError] = useState<boolean>(false);
    const [userData, setUserData] = useState<IUserData>({
        username: cookies.user?.username,
        receivername: '',
        connected: false,
        message: ''
    });
    const [onMessageScroll, setOnMessageScroll] = useState<boolean>(false);

    const inputFocus = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const chatFocus = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    const prChatFocus = React.useRef() as React.MutableRefObject<HTMLInputElement>;

    const scrollRef = useRef() as React.MutableRefObject<HTMLUListElement>;
    const scrollRefPr = useRef() as React.MutableRefObject<HTMLUListElement>;

    // 클라생성, 연결
    const connect = useCallback(() => {
        let Sock = new SockJS('http://acoapi.hyns.co.kr/api/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
        stompClient.debug = null
    }, [])

    // 구독
    const onConnected = useCallback(() => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }, [userData])

    // Join 전송
    const userJoin = useCallback(() => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }, [userData.username])

    // 수신
    const onMessageReceived = (payload: any) => {
        var payloadData = JSON.parse(payload.body);
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    // 프라이빗 수신
    const onPrivateMessage = (payload: any) => {
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    // 에러발생시
    const onError = useCallback((err: unknown) => {
        console.log(err);
    }, [])

    // 메세지핸들
    const handleMessage = useCallback((event: any) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
        setOnMessageScroll(true)
    }, [userData])

    // 메세지 전송
    const sendValue = () => {
        if (userData.message === '') {
            chatFocus.current.focus()
            setChatError(true)
            return
        }
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            chatFocus.current.focus()
            setChatError(false)
        }
        chatFocus.current.focus()
        setChatError(false)
    }

    // 엔터
    const onKeyPress = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            sendValue();
        }
    }, [userData.message])

    const onKeyPressPr = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            sendPrivateValue();
        }
    }, [userData.message])

    // Private 메세지 전송
    const sendPrivateValue = () => {
        if (userData.message === '') {
            prChatFocus.current.focus()
            setChatError(true)
            return
        }
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
            prChatFocus.current.focus()
        }
        prChatFocus.current.focus()
    }

    // Name핸들
    const handleUsername = useCallback((event: any) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }, [userData.username])

    // 접속
    const registerUser = useCallback(() => {
        if (userData.username === '' || userData.username.match(/\s/g)) {
            chatFocus.current.focus()
            setConnectError(true)
            return
        }
        connect();
        setConnectError(false)
    }, [userData.username])

    // 접속 엔터
    const registerUserEnter = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            registerUser()
        }
    }, [userData.username])

    useEffect(() => {
        if(tab === 'CHATROOM' && scrollRef.current !== undefined && scrollRef) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [scrollRef, publicChats])

    useEffect(() => {
        if(tab !== 'CHATROOM' && scrollRefPr.current !== undefined && scrollRefPr) {
            scrollRefPr.current.scrollTop = scrollRefPr.current.scrollHeight;
        }
    }, [scrollRefPr, privateChats])

    return (
        <div className="relative">
            {userData.connected ?
                <div className="chat-box" >
                    <div className="w-1/5">
                        <ul>
                            <li onClick={() => { setTab("CHATROOM") }}
                                className={`rounded-lg member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                            {[...privateChats.keys()].map((name, index) => (
                                <li onClick={() => { setTab(name) }}
                                    className={`rounded-lg member ${tab === name && "active"}`} key={index}>{name}</li>
                            ))}
                        </ul>
                    </div>
                    {tab === "CHATROOM" && <div className="w-4/5 ml-3 rounded-lg">
                            <ul ref={scrollRef} className="h-4/5 p-6 mb-5 overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                {publicChats.map((chat: any, index: number) => (
                                    <li className={`message border border-gray-200 rounded-lg
                                    ${chat.senderName === userData.username && "justify-end"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                        <div className="message-data flex items-center">{chat.message}</div>
                                        {chat.senderName === userData.username &&
                                            <div className="flex items-center px-3 py-2 rounded-lg bg-green-100">{chat.senderName}</div>}
                                    </li>
                                ))}
                            </ul>
                        <div className="send-message">
                            <input type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="채팅을 입력해주세요."
                                value={userData.message}
                                onChange={handleMessage}
                                ref={chatFocus}
                                onKeyDown={onKeyPress} />
                            <button
                                type="button"
                                onClick={sendValue}
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 rotate-90"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                        {chatError ? <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            공백은 입력할 수 없습니다.</p> : <></>}
                    </div>}
                    {tab !== "CHATROOM" && <div className="w-4/5 ml-3 rounded-lg">
                        <ul ref={scrollRefPr} className="h-4/5 p-6 overflow-y-scroll mb-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message border border-gray-200 rounded-lg
                                 ${chat.senderName === userData.username && "justify-end"}`} key={index}>
                                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data flex items-center">{chat.message}</div>
                                    {chat.senderName === userData.username &&
                                        <div className="flex items-center px-3 py-2 rounded-lg bg-green-100">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className="send-message">
                            <input type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="채팅을 입력해주세요."
                                value={userData.message}
                                onChange={handleMessage}
                                ref={prChatFocus}
                                onKeyDown={onKeyPressPr} />
                            <button
                                type="button"
                                onClick={sendPrivateValue}
                                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                <svg
                                    aria-hidden="true"
                                    className="w-6 h-6 rotate-90"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                                <span className="sr-only">Send message</span>
                            </button>
                        </div>
                    </div>}
                </div>
                :
                <div className='flex justify-center items-center h-screen90'>
                    <div className="flex flex-col justify-center items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md
                     hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div className='w-full'>
                            <input
                                type="text"
                                id="username-error"
                                className={`block w-full max-w-sm border text-sm rounded-lg p-2.5
                                ${connectError ?
                                        'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-red-100 dark:border-red-400'
                                        : ''}`}
                                placeholder="채팅ID를 입력해주세요."
                                value={userData.username}
                                onChange={handleUsername}
                                onKeyDown={registerUserEnter}
                                ref={inputFocus}
                            />
                            {connectError &&
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    채팅ID가 올바르지 않습니다.</p>
                            }
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                            onClick={registerUser}
                        >입장</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatRoom