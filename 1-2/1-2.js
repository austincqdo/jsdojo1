const fileManage = {
    'f001': {'Folder Name': 'Information System Department',
        'View Auth': 'Information System Department',
        'Edit Auth': 'Information System Department',
        'Delete Auth': 'Information System Department'},
    'f002': {'Folder Name': 'Corporate Planning Department',
        'View Auth': 'Corporate Planning Department',
        'Edit Auth': 'Corporate Planning Department',
        'Delete Auth': 'Corporate Planning Department'},
    'f003': {'Folder Name': 'Sales Department',
        'View Auth': 'Everyone',
        'Edit Auth': 'Sales Department',
        'Delete Auth': 'Sales Department'},
    'f004': {'Folder Name': 'Development Division',
        'View Auth': 'Development Division',
        'Edit Auth': 'Development Division',
        'Delete Auth': 'Development Division'},
    'f005': {'Folder Name': 'General Affairs Department',
        'View Auth': 'Everyone',
        'Edit Auth': 'Everyone',
        'Delete Auth': 'General Affairs Department'},
    'f006': {'Folder Name': 'Accounting Department',
        'View Auth': 'Accounting Department',
        'Edit Auth': 'Accounting Department',
        'Delete Auth': 'Accounting Department'},
    'f007': {'Folder Name': 'Planning Department',
        'View Auth': 'Everyone',
        'Edit Auth': 'Planning Department',
        'Delete Auth': 'Planning Department'
    }
};

for (let i = 1; i < 8; i++) {
    const folderID = 'f00' + i;
    const folder = fileManage[folderID];
    document.getElementById('folderName' + i).textContent = folder['Folder Name'];
    document.getElementById('viewAuth' + i).textContent = folder['View Auth'];
    document.getElementById('editAuth' + i).textContent = folder['Edit Auth'];
    document.getElementById('deleteAuth' + i).textContent = folder['Delete Auth'];
}