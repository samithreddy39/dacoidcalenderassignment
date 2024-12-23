# Dynamic Event Calendar Application

## **Objective**

Build a **Dynamic Event Calendar Application**. The goal is to evaluate your skills in advanced React.js logic, clean UI design, and deployment capabilities.

## **Summary of Features**

This dynamic event calendar application allows users to manage events for each day, navigate between months, and filter events. The key features of the app include:

### **Feature Set:**

- **Calendar View**:
  - Displays a calendar grid for the current month with all days properly aligned.
  - Users can switch between months using "Previous" and "Next" buttons.

- **Event Management**:
  - Users can add events by clicking on any day.
  - Users can edit or delete events from a selected day.
  - Each event includes:
    - Event name
    - Start time and end time
    - Optional description

- **Event List**:
  - Displays a list of all events for the selected day in a modal or side panel.

- **Data Persistence**:
  - Events are persisted in **localStorage** to ensure that data is retained between page refreshes.

### **UI Requirements**:

- Display days in a grid with clear separation between weekends and weekdays.
- The current day and selected day are highlighted visually.

### **Complex Logic**:

- **Month Transitions**: Handles transitions between months (e.g., from Jan 31 to Feb 1).
- **Event Overlap Prevention**: Prevents overlapping events by checking if there’s already an event scheduled for the selected time.
- **Event Filtering**: Allows users to filter events by keyword for easy searching.

## **Technologies Used**

- **React** for building the user interface.
- **shadcn** for UI components.
- **date-fns** for date manipulation and handling complex logic.
- **localStorage** for data persistence between page refreshes.
- **CSS** for styling.

## **Instructions to Run the App Locally**

Follow these steps to run the app on your local machine:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/samithreddy39/dacoidcalenderassignment.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd dacoidcalenderassignment
    ```

3. **Install dependencies**:
    Make sure you have Node.js installed on your machine. Then, run:
    ```bash
    npm install
    ```

4. **Run the development server**:
    After the installation is complete, start the application:
    ```bash
    npm start
    ```

    This will start the app on `http://localhost:3000`.

5. **Access the app**:
    Open your browser and go to `http://localhost:3000` to view the calendar app.

## **Link to the Deployed App**

You can view the live version of the app at the following URL:
- [Deployed App Link](https://dacoidcalenderassignment.vercel.app/)



## **License**

This project is open-source and available under the [MIT License](LICENSE).
