import os
import subprocess
import sys

# ფაილი, რომელიც აღნიშნავს რომ ინსტალაცია უკვე მოხდა
FLAG_FILE = ".setup_done"

def run_command(command):
    try:
        subprocess.check_call([sys.executable, "-m"] + command)
    except subprocess.CalledProcessError as e:
        print(f"შეცდომა ბრძანების შესრულებისას: {e}")

def main():
    if not os.path.exists(FLAG_FILE):
        print("--- გარემოს მომზადება დაიწყო ---")
        
        # 1. pip-ის განახლება
        print("მიმდინარეობს pip-ის განახლება...")
        run_command(["pip", "install", "--upgrade", "pip"])

        # 2. requirements.txt-ის შემოწმება და ინსტალაცია
        if os.path.exists("requirements.txt"):
            print("ბიბლიოთეკების ინსტალაცია...")
            run_command(["pip", "install", "-r", "requirements.txt"])
        else:
            print("გაფრთხილება: requirements.txt ვერ მოიძებნა.")

        # 3. ფლაგ-ფაილის შექმნა
        with open(FLAG_FILE, "w") as f:
            f.write("Setup completed")
        
        print("--- მზად არის! გარემო გამართულია. ---")
    else:
        # თუ ფაილი არსებობს, სკრიპტი ჩუმად სრულდება
        pass

if __name__ == "__main__":
    main()