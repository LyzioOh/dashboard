import axios from 'axios'
const {post} = axios
const create_meeting_url = "https://prod-09.francecentral.logic.azure.com:443/workflows/aeea45e9e08746d69de8df8a491eb0ef/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OfCEMncJX8TFFEoSQ_IISDC60ku5mkA6BmqwPEUcL0Y"
const createMeeting = async (payload: any) =>await post(create_meeting_url, payload)
    export default createMeeting