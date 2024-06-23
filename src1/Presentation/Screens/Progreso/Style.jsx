import { StyleSheet } from "react-native";
import { config } from "../../../Config";
const Styles = StyleSheet.create({

    container: {
        flex: 1,
        // paddingTop: 10,
        bottom:20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16
    },
    card: {
        flex: 1,
        backgroundColor: '#ff7f50',
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 16,
        padding: 16,
    },
    header: {
        marginBottom: 8,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#ffffff',
    },
    body: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 8,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    userRole: {
        fontSize: 12,
        color: '#ffffff',
    },
    classItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    timelineContainer: {
        width: 30,
        alignItems: 'center',
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ff7f50',
        marginBottom: 8,
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#ff7f50',
    },
    classContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    classHours: {
        marginRight: 8,
        alignItems: 'flex-end',
    },
    startTime: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    endTime: {
        fontSize: 16,
    },
    cardTitle: {
        fontSize: 16,
        color: '#00008B',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#00008B',
        marginBottom: 8,
    },
    studentListContainer: {
        marginRight: 10,
    },
    studentAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: -3,
        borderWidth: 1,
        borderColor: '#fff'
    },
    topButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      },
      topButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ff7f50', // Fondo naranja
        borderColor: '#ff7f50', // Borde naranja
        borderWidth: 1,
        borderRadius: 14,
      },
      topButtonText: {
        fontSize: 11,
        color: '#FFF', // Texto blanco
      },
    /* BTN DE TAB DE OPCIONES */

})
export default Styles
