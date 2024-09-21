// id: '120363249874424747@g.us',
//   subject: 'PAC Karangjambu Reborn 💚💛',
//   subjectOwner: '6285726206279@s.whatsapp.net',
//   subjectTime: 1709297325,
//   size: 29,
//   creation: 1709297325,
//   owner: '6285726206279@s.whatsapp.net',
//   desc: undefined,
//   descId: undefined,
//   linkedParent: undefined,
//   restrict: false,
//   announce: false,
//   isCommunity: false,
//   isCommunityAnnounce: false,
//   joinApprovalMode: false,
//   memberAddMode: true,
//   participants: [
//     { id: '6281227442671@s.whatsapp.net', admin: null },
//     { id: '6281227569305@s.whatsapp.net', admin: null },
//     { id: '6281227790926@s.whatsapp.net', admin: null },
//     { id: '6281325862850@s.whatsapp.net', admin: null },
//     { id: '6281390855641@s.whatsapp.net', admin: null },
//     { id: '6281391682799@s.whatsapp.net', admin: null },
//     { id: '6281572124697@s.whatsapp.net', admin: null },
//     { id: '6282131308001@s.whatsapp.net', admin: null },
//     { id: '6282133156961@s.whatsapp.net', admin: 'admin' },
//     { id: '6282136071849@s.whatsapp.net', admin: null },
//     { id: '6282188670585@s.whatsapp.net', admin: null },
//     { id: '6282220171358@s.whatsapp.net', admin: null },
//     { id: '6282220652954@s.whatsapp.net', admin: null },
//     { id: '6282221060990@s.whatsapp.net', admin: null },
//     { id: '6282313858699@s.whatsapp.net', admin: null },
//     { id: '6282313859162@s.whatsapp.net', admin: null },
//     { id: '6282314729203@s.whatsapp.net', admin: null },
//     { id: '6282325460500@s.whatsapp.net', admin: null },
//     { id: '6283108876674@s.whatsapp.net', admin: null },
//     { id: '6283871084025@s.whatsapp.net', admin: null },
//     { id: '6285293506841@s.whatsapp.net', admin: null },
//     { id: '6285602697783@s.whatsapp.net', admin: null },
//     { id: '6285640960063@s.whatsapp.net', admin: 'admin' },
//     { id: '6285700447989@s.whatsapp.net', admin: 'admin' },
//     { id: '6285726206279@s.whatsapp.net', admin: 'superadmin' },
//     { id: '6285877084781@s.whatsapp.net', admin: null },
//     { id: '6285878341797@s.whatsapp.net', admin: 'admin' },
//     { id: '6287863226822@s.whatsapp.net', admin: 'admin' },
//     { id: '62895395590009@s.whatsapp.net', admin: null }
//   ],
//   ephemeralDuration: undefined
// }

import { sanitizeBotId } from "./bot.js"

export const getGroupMetadata = async ({ sock, id }) => {
    let metadata = await sock.groupMetadata(id)
    return {
        id: metadata.id,
        subject: metadata.subject,
        subjectOwner: metadata.subjectOwner,
        subjectTime: metadata.subjectTime,
        size: metadata.size,
        creation: metadata.creation,
        owner: metadata.owner,
        desc: metadata.desc,
        descId: metadata.descId,
        linkedParent: metadata.linkedParent,
        restrict: metadata.restrict,
        announce: metadata.announce,
        isCommunity: metadata.isCommunity,
        isCommunityAnnounce: metadata.isCommunityAnnounce,
        joinApprovalMode: metadata.joinApprovalMode,
        memberAddMode: metadata.memberAddMode,
        participants: metadata.participants,
        ephemeralDuration: metadata.ephemeralDuration
    }

}
export const isBotAdmin = async ({ sock, id }) => {
    let metadata = await getGroupMetadata(sock, id)
    return metadata.participants.find(v => v.id == sanitizeBotId(sock.user.id)).admin
}
export const isAdmin = async ({ sock, id, sender }) => {
    let metadata = await getGroupMetadata(sock, id)
    return metadata.participants.find(v => v.id == sender).admin
}
export const isSuperAdmin = async ({ sock, id, sender }) => {
    let metadata = await getGroupMetadata(sock, id)
    return metadata.participants.find(v => v.id == sender).admin == 'superadmin'
}
export const isOwnerGrup = async ({ sock, id, sender }) => {
    let metadata = await getGroupMetadata(sock, id)
    return metadata.owner == sender
}
export const isGroup = async ({ sock, id }) => {
    let metadata = await getGroupMetadata(sock, id)
    return metadata.id.endsWith('@g.us')
}
