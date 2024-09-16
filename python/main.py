import webview  
from pynput import keyboard
import ctypes
# import pefile
import os
import sys
import clr

import comtypes.client

import win32com.client
import win32com.client.gencache
# import win32com.client.constants as constants
import win32com.client.dynamic
import winreg
from cffi import FFI


# regsvr32 d:\projects\render_pdf\python\lockerDLL\Interop.DcdzDriverBoardLib.dll


# # clr.AddReference('lockerDLL/DcdzDriverBoardLib')
# clr.AddReference(dll_path)

# import DcdzDriverBoardLib

# driver_board = DcdzDriverBoardLib.DriverBoard()


# pressed_keys = set()
# # closed to window 
# def on_press(key):
#     try:
#         pressed_keys.add(key)
#         # print('Нажатые клавиши:', pressed_keys)

#         if keyboard.KeyCode.from_char('q') in pressed_keys and keyboard.KeyCode.from_char('w') in pressed_keys:
#             print("Окно закрыто через q + w")
#             webview.windows[0].destroy()  
#             return False  
#     except AttributeError:
#         pass


# # listener to leyboard
# def listen_for_keys():
#     with keyboard.Listener(on_press=on_press) as listener:
#         listener.join()


# key_listener_thread = threading.Thread(target=listen_for_keys)
# key_listener_thread.start()

window = webview.create_window(
    'Test window',
    'http://10.14.132.43:9000', 
    confirm_close=True,
    # frameless=True,
    # on_top=True, 
    # fullscreen=True,
    # easy_drag=False
    )

# def on_close():
#     print('Click to closed window')
#     return False 


# window.events.closing += on_close


# open lockers
def echo(lockerId):
    if not lockerId:
        print('lickerId is empty or not provided')
        return
    
    print('lickerId', lockerId)
    open_calc_for_dll(lockerId)

def open_calc_for_dll(fileName: str):
    shell32 = ctypes.WinDLL('shell32.dll')

    operation = 'open'

    file = fileName #'calc.exe'

    operation_w = ctypes.c_wchar_p(operation)
    file_w = ctypes.c_wchar_p(file)

    result = shell32.ShellExecuteW(None, operation_w, file_w, None, None, 1)

    if result > 32:
        print(f"{fileName} open success")
    else:
        print(f"{fileName} open Error")

ffi = FFI()

# Open dll functions
def open_dll():
    current_dir = os.path.dirname(os.path.abspath(__file__))  
    dll_path = os.path.join(current_dir, 'lockerDLL', 'DcdzDriverBoard.dll')   
    print('dll_path', dll_path)
    my_dll = ffi.dlopen(dll_path)

    ffi.cdef("""
    long GetVersions(unsigned char uBoardNo, char* sVersions);
""")
    
    version_buffer = ffi.new("char[256]")
    result = my_dll.GetVersions(1, version_buffer)   
    print(f"Result: {result}")
    print(f"Versions: {ffi.string(version_buffer).decode('utf-8')}") 

    # # 0x28380 DllCanUnloadNow
    # # 0x2a580 DllGetClassObject
    # # 0x2abf0 DllInstall
    # # 0x2abd0 DllRegisterServer
    # # 0x2abe0 DllUnregisterServer

    # # DcdzDriverBoard.dll cell lockers 
    # # DcdzCardReader.dll
    # # DcdzMsComm.dll
    # # DcdzNetClient.dll
    # # msvcp100.dll
    # # msvcr100.dll
    pass


def js_callback(window):
    window.expose(echo)
    window.expose(open_dll)



webview.start(js_callback, window, debug=True)