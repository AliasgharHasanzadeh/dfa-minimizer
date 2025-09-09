## DFA Minimizer

Interactive tool to build and minimize Deterministic Finite Automata (DFA). You can add states and transitions, choose the start state and final states, and compute the minimized DFA. Designed for students, instructors, and enthusiasts of automata theory.

Demo: [dfa-minimizer.aliasghardev.ir](http://dfa-minimizer.aliasghardev.ir/)  
Reference: [Site UI flow](http://dfa-minimizer.aliasghardev.ir/)

### Technologies
- **HTML**
- **CSS (Tailwind)**
- **JavaScript**

### Features
- Add states and transitions
- Choose the start state
- Choose the final states
- Calculate the minimized DFA
- Side-by-side view of Input DFA and Minimized DFA
- Lightweight, client-side UI

### Project Structure
- `index.html`: Main page and UI structure
- `src/input.css` and `src/output.css`: Styles (Tailwind output in `output.css`)
- `script/alghortim.js`: DFA minimization algorithm
- `script/logic.js`: UI event handling and wiring to the algorithm

### How to Use
1. Click the "Add" buttons to create states and transitions.  
2. In "Choose the start state", select the start state.  
3. In "Choose the Final States", mark the accepting states.  
4. Click "calculate MIN-DFA" to compute the minimized DFA.  
5. Review both "Input DFA" and "Minimized DFA" sections.

### Local Development
- Open `index.html` directly in your browser to use the app.  
- If you modify styles, rebuild Tailwind so changes appear in `src/output.css`.

### Contributing
- Please file issues for bugs or feature requests.  
- Open pull requests with a short description of your changes.

### Contact
- LinkedIn: [Aliasghar Hasanzadeh](https://www.linkedin.com/in/aliasghar-hasanzadeh/)
- Instagram: [@aliasghar.dev](https://www.instagram.com/aliasghar.dev?igsh=cmg5ZnJvMDMxODdu)
- CodePen: [Aliasghar-Hasanzadeh](https://codepen.io/Aliasghar-Hasanzadeh)

---

## Related Project: Weather App

Live Demo: [weatherapp.aliasghardev.ir](https://weatherapp.aliasghardev.ir)

A responsive weather forecast app with real-time data using the OpenWeather API. It fully supports search by city name and works reliably across networks in Iran via a Cloudflare backend proxy that hides the API key.

### Technologies Used
- **HTML**
- **CSS (Tailwind)**
- **JavaScript**
- **Cloudflare Workers**

### Backend Security
To avoid exposing the API key and to ensure compatibility across ISPs in Iran, a Cloudflare Worker is used to:
- Hide the OpenWeather API key
- Prevent direct client-side requests (which may be blocked or rate-limited)
- Format data to match frontend expectations (`res.json()`)

### Features
- Search by city name
- Real-time weather data
- Backend proxy (Cloudflare Worker)
- Secure API access
- Clean UI and responsive layout

### Preview
![weatherapp](https://github.com/user-attachments/assets/3379953f-50e8-4665-a98d-7a4f0871c93a)

### Contact
- LinkedIn: [Aliasghar Hasanzadeh](https://www.linkedin.com/in/aliasghar-hasanzadeh/)
- Instagram: [@aliasghar.dev](https://www.instagram.com/aliasghar.dev?igsh=cmg5ZnJvMDMxODdu)
- CodePen: [Aliasghar-Hasanzadeh](https://codepen.io/Aliasghar-Hasanzadeh)

> Note: This app uses the free tier of OpenWeather, so data limits may apply. You can upgrade the API plan or change the source if needed.

---

## References
- DFA Minimizer UI: [dfa-minimizer.aliasghardev.ir](http://dfa-minimizer.aliasghardev.ir/)


