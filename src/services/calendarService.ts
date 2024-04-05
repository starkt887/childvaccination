import { useEffect, useState } from "react";
import { ENV } from "../utlils/envGetter";



export function useCalendarService() {
    let tokenClient;
    const [gapiInited, setGapiInited] = useState<boolean>(false)
    const [gisInited, setGisInited] = useState<boolean>(false)
    useEffect(() => {
        gapiLoaded()
        gisLoaded()
        console.log("gapi:", gapiInited)
        console.log("gis:", gisInited)
        //gis takes time to load in async way, so to try to reinitialize 
    }, [gapiInited])

    // useEffect(() => {
    //     console.log("gapi2:", gapiInited)
    //     console.log("gis2:", gisInited)
    // }, [gapiInited, gisInited])


    async function gapiLoaded() {
        await gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {

        await gapi.client.init({
            apiKey: ENV.VITE_API_KEY,
            discoveryDocs: [ENV.VITE_DISCOVERY_DOC],
        });
        setGapiInited(true);
    }

    function gisLoaded() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: ENV.VITE_CLIENT_ID,
            scope: ENV.VITE_SCOPES,
            callback: '', // defined later
        });
        setGisInited(true);
    }

    //login
    function handleAuthAndCreateEvent(
        startDatetime: string,
        endDateTime: string,
        summary: string,
        location: string,
        description: string
    ) {
        tokenClient.callback = async (resp: any) => {
            if (resp.error !== undefined) {
                throw (resp);
            }
            console.log(resp)
            createEvent(
                startDatetime,
                endDateTime,
                summary,
                location,
                description,
            )
        };

        console.log(gapi.client.getToken());
        if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            tokenClient.requestAccessToken({ prompt: 'consent' });
        }
        else {
            createEvent(
                startDatetime,
                endDateTime,
                summary,
                location,
                description,
            )
        }
    }

    //logout
    function handleSignoutClick() {
        const token: any = gapi.client.getToken();
        if (token !== null) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
        }
    }

    function createEvent(
        startDatetime: string,
        endDateTime: string,
        summary: string,
        location: string,
        description: string) {


        const event = {
            'summary': summary,
            'location': location,
            'description': description,
            'start': {
                'dateTime': startDatetime,
                'timeZone': 'Asia/Kolkata'
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Asia/Kolkata'
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 5 * 60 }
                ]
            },
        };

        const request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function (event: any) {
            console.log('Event created: ' + event.htmlLink);
        });
    }

    return {
        handleAuthAndCreateEvent, handleSignoutClick, createEvent, gapiInited, gisInited
    }
}