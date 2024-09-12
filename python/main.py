import threading
import webview 
from pynput import keyboard
import ctypes


pressed_keys = set()
# closed to window 
def on_press(key):
    try:
        pressed_keys.add(key)
        # print('Нажатые клавиши:', pressed_keys)

        if keyboard.KeyCode.from_char('q') in pressed_keys and keyboard.KeyCode.from_char('w') in pressed_keys:
            print("Окно закрыто через q + w")
            webview.windows[0].destroy()  
            return False  
    except AttributeError:
        pass


# listener to leyboard
def listen_for_keys():
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()


key_listener_thread = threading.Thread(target=listen_for_keys)
key_listener_thread.start()

window = webview.create_window(
    'Test window',
    'http://10.14.132.43:9000', 
    confirm_close=True,
    frameless=True,
    on_top=True, 
    fullscreen=True,
    easy_drag=False
    )

# def on_close():
#     print('Click to closed window')
#     return False 


# window.events.closing += on_close


#
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



def js_callback(window):
    window.expose(echo)

    # window.evaluate_js('pywebview.api.echo("")')


webview.start(js_callback, window, debug=False)